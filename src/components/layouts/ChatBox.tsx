'use client';

import { useState, useRef, useEffect } from 'react';

interface ChatBoxProps {
  title: string;
  icon: string;
  agentType: string;
  description: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatBox({ title, icon, agentType, description }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hi! I'm your ${title} assistant. ${description}`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/planTrip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          conversationHistory: messages,
          context: agentType,
        }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message || 'Sorry, I encountered an error. Please try again.',
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-strong rounded-2xl shadow-warm flex flex-col h-[500px] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-butter/20 bg-butter/10">
        <span className="text-3xl">{icon}</span>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-charcoal">{title}</h3>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`
                max-w-[85%]
                px-4 py-2
                rounded-2xl
                text-sm
                ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-glow to-butter text-charcoal'
                    : 'bg-white/80 text-charcoal border border-butter/30'
                }
              `}
            >
              <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/80 rounded-2xl px-4 py-2 border border-butter/30">
              <div className="flex items-center gap-2">
                <div className="text-lg">✨</div>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-glow rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-glow rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-glow rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-3 border-t border-butter/20 bg-cream/20">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Ask me anything..."
            className="
              flex-1
              px-4 py-2
              rounded-full
              bg-white/80
              border border-butter/30
              text-charcoal
              text-sm
              focus:outline-none
              focus:border-glow
              placeholder-charcoal-light/50
              disabled:opacity-50
            "
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="
              px-5 py-2
              rounded-full
              bg-gradient-to-r from-glow to-butter
              text-charcoal
              font-semibold
              text-sm
              hover:scale-105
              active:scale-95
              transition-transform
              disabled:opacity-50
              disabled:cursor-not-allowed
              disabled:hover:scale-100
            "
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
