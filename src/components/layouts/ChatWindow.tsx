'use client';

import { useState, useRef, useEffect } from 'react';
import ChatTextarea from '../common/ChatTextarea';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  featureId: string;
  featureName: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatWindow({ isOpen, onClose, featureId, featureName }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hey! I'm your Wonderlust AI assistant for ${featureName}. How can I help you plan your perfect trip? ✨`,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/planTrip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          conversationHistory: messages,
          context: featureId,
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

  if (!isOpen) return null;

  return (
    <>
      {/* Blurred Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-md z-40 animate-fade-in-up"
        onClick={onClose}
      />

      {/* Chat Window - Slides up from bottom center */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-3xl h-[85vh] z-50 animate-slide-up">
        <div className="glass-strong rounded-t-3xl shadow-2xl h-full flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-butter/20">
            <div>
              <h2 className="text-2xl font-bold text-charcoal">{featureName}</h2>
              <p className="text-sm text-charcoal-light">Your AI travel assistant</p>
            </div>
            <button
              onClick={onClose}
              className="
                w-10 h-10
                rounded-full
                bg-butter/20
                hover:bg-butter/40
                flex items-center justify-center
                transition-all duration-200
                hover:scale-110
              "
              aria-label="Close chat"
            >
              <span className="text-2xl text-charcoal">×</span>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
              >
                <div
                  className={`
                    max-w-[80%]
                    px-6 py-4
                    rounded-3xl
                    shadow-sm
                    ${
                      message.role === 'user'
                        ? 'btn-butter text-charcoal'
                        : 'bg-white/80 text-charcoal border border-butter/30'
                    }
                  `}
                >
                  <p className="text-base leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start animate-fade-in-up">
                <div className="bg-white/80 backdrop-blur-md rounded-3xl px-6 py-4 shadow-sm border border-butter/30">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">✨</div>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-glow rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-glow rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-glow rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <span className="text-charcoal-light text-sm">Thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-butter/20">
            <ChatTextarea
              onSend={handleSend}
              disabled={isLoading}
              placeholder={`Ask me anything about ${featureName.toLowerCase()}...`}
            />
          </div>
        </div>
      </div>
    </>
  );
}
