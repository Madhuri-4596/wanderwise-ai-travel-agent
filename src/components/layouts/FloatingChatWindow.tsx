'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ChatTextarea from '../common/ChatTextarea';

interface FloatingChatWindowProps {
  agentId: string;
  agentName: string;
  agentIcon: string;
  agentDescription: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function FloatingChatWindow({
  agentId,
  agentName,
  agentIcon,
  agentDescription
}: FloatingChatWindowProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hi! I'm your ${agentName} assistant. ${agentDescription}`,
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
          context: agentId,
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
    <div className="min-h-screen relative overflow-hidden py-8">
      {/* Golden Sparkle Dust Particles */}
      <div className="sun-particle">✨</div>
      <div className="sun-particle">✨</div>
      <div className="sun-particle">✨</div>

      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-butter/30 to-glow/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-br from-glow/20 to-butter/30 rounded-full blur-3xl animate-blob-reverse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        {/* Floating Chat Window */}
        <div className="glass-strong rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-butter/20 bg-gradient-to-r from-butter/20 to-glow/10">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{agentIcon}</span>
              <div>
                <h2 className="text-3xl font-bold text-charcoal gradient-text">{agentName}</h2>
                <p className="text-sm text-charcoal-light">Your AI travel assistant</p>
              </div>
            </div>
            <button
              onClick={() => router.push('/')}
              className="
                w-12 h-12
                rounded-full
                bg-butter/20
                hover:bg-butter/40
                flex items-center justify-center
                transition-all duration-200
                hover:scale-110
                hover:rotate-90
              "
              aria-label="Back to home"
            >
              <span className="text-3xl text-charcoal">×</span>
            </button>
          </div>

          {/* Messages Area */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-cream/10">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
              >
                <div
                  className={`
                    max-w-[75%]
                    px-6 py-4
                    rounded-3xl
                    shadow-sm
                    ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-glow to-butter text-charcoal font-medium'
                        : 'bg-white/90 text-charcoal border border-butter/30'
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
                <div className="bg-white/90 backdrop-blur-md rounded-3xl px-6 py-4 shadow-sm border border-butter/30">
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
          <div className="p-6 border-t border-butter/20 bg-gradient-to-r from-cream/20 to-butter/10">
            <ChatTextarea
              onSend={handleSend}
              disabled={isLoading}
              placeholder={`Ask me anything about ${agentName.toLowerCase()}...`}
            />
          </div>
        </div>

        {/* Bottom Info */}
        <div className="text-center mt-8 animate-fade-in-up delay-300">
          <p className="text-sm text-charcoal-light">
            Powered by AI • Made with 💛
          </p>
        </div>
      </div>
    </div>
  );
}
