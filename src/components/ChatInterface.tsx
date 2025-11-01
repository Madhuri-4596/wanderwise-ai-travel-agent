'use client';

import { useState, useRef, useEffect } from 'react';
import { Message } from '@/types';
import MessageBubble from './common/MessageBubble';
import ChatTextarea from './common/ChatTextarea';

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "🌸 Hey wanderer! I'm WanderWise, your AI travel companion. Ready to plan your next dreamy escape? Tell me about your perfect trip and I'll help with everything - destinations, itineraries, flights, hotels, and more. Where shall we wander? ✨",
      timestamp: new Date(),
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
      timestamp: new Date(),
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
        }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message || 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error connecting to the server. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const examplePrompts = [
    "🌸 Plan a 5-day trip to Bali under $1500",
    "💕 Romantic weekend in Paris for couples",
    "👨‍👩‍👧‍👦 Family vacation to Tokyo with 2 kids",
    "🎒 Budget backpacking through Thailand",
  ];

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 relative overflow-hidden">
      {/* Sakura Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-20 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-64 h-64 bg-rose-200 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header with Sakura Theme */}
      <div className="relative bg-gradient-to-r from-pink-400 via-rose-400 to-pink-400 shadow-2xl px-6 py-4 border-b-4 border-rose-300">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">
              🌸 WanderWise
            </h1>
            <p className="text-sm text-pink-100">Wander smart, travel wise</p>
          </div>
          <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/30 transition font-semibold border border-white/30">
            Save Trip ✨
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-6 relative z-10">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message.content}
              isUser={message.role === 'user'}
              timestamp={new Date(message.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            />
          ))}
          {isLoading && (
            <div className="flex justify-start animate-fade-in-up">
              <div className="bg-white/90 backdrop-blur-md rounded-3xl px-6 py-4 shadow-lg border-2 border-pink-200">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🌸</div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="text-pink-600 text-sm">Planning your perfect journey...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Example Prompts */}
      {messages.length === 1 && (
        <div className="px-4 pb-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm text-pink-600 mb-3 font-semibold">✨ Try asking:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {examplePrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="text-left text-sm bg-white/70 backdrop-blur-sm hover:bg-gradient-to-r hover:from-pink-100 hover:to-rose-100 text-gray-700 hover:text-pink-700 px-4 py-3 rounded-2xl border-2 border-pink-200 hover:border-rose-400 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Form with ChatTextarea Component */}
      <div className="bg-white/50 backdrop-blur-sm border-t-2 border-pink-200 px-4 py-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <ChatTextarea
            onSend={handleSend}
            disabled={isLoading}
            placeholder="🌸 Describe your dream destination... Where shall we wander?"
          />
        </div>
      </div>
    </div>
  );
}
