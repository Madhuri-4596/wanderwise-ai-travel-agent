'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Message } from '@/types';
import ChatTextarea from '@/components/common/ChatTextarea';
import MessageBubble from '@/components/common/MessageBubble';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  agentType: string;
  agentTitle: string;
}

export default function ChatWindow({ isOpen, onClose, agentType, agentTitle }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      // Reset messages and add welcome message when agent changes
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Welcome to ${agentTitle}! How can I help you today?`,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, agentType, agentTitle]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      // Build conversation history for context (exclude welcome message)
      const conversationHistory = messages
        .filter(msg => msg.role !== 'system')
        .map(msg => ({
          role: msg.role,
          content: msg.content,
        }));

      const response = await fetch(`/api/${agentType}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: currentInput,
          conversationHistory
        }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message || 'Sorry, I encountered an error.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Background overlay with blur */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 fade-in"
        onClick={onClose}
      />

      {/* Chat window */}
      <div className={`fixed ${isMaximized ? 'inset-0' : 'inset-x-0 bottom-0'} z-50 flex justify-center items-end ${isMaximized ? 'p-0' : 'p-4'}`}>
        <div className={`w-full ${isMaximized ? 'max-w-full h-full' : 'max-w-2xl h-[80vh]'} ${isMinimized ? 'h-auto' : ''} bg-gradient-to-b from-orange-50 to-white ${isMaximized ? 'rounded-none' : 'rounded-t-3xl'} shadow-2xl slide-up flex flex-col`}>
          {/* Header */}
          <div className={`flex items-center justify-between px-6 py-4 border-b-2 border-orange-200 bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 ${isMaximized ? 'rounded-none' : 'rounded-t-3xl'}`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-orange-600 font-bold shadow-lg">
                AI
              </div>
              <div>
                <h2 className="text-lg font-black text-white drop-shadow-md">{agentTitle}</h2>
                <p className="text-xs font-bold text-white/90">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Minimize Button */}
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="w-8 h-8 rounded-full hover:bg-white/20 smooth-transition flex items-center justify-center"
                aria-label="Minimize chat"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-white drop-shadow-md"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                </svg>
              </button>

              {/* Maximize Button */}
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="w-8 h-8 rounded-full hover:bg-white/20 smooth-transition flex items-center justify-center"
                aria-label="Maximize chat"
              >
                {isMaximized ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-white drop-shadow-md"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-white drop-shadow-md"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                  </svg>
                )}
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full hover:bg-white/20 smooth-transition flex items-center justify-center"
                aria-label="Close chat"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-white drop-shadow-md"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          {!isMinimized && (
          <div className="flex-1 overflow-y-auto px-6 py-4 relative">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/videos/travel-bg.mp4" type="video/mp4" />
              </video>
              {/* Overlay for better message readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/60 to-white/70 backdrop-blur-[2px]"></div>
            </div>

            {/* Messages Container */}
            <div className="relative z-10">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="bg-white px-5 py-4 rounded-2xl shadow-lg border border-orange-100">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2.5 h-2.5 bg-orange-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          )}

          {/* Input */}
          {!isMinimized && (
          <div className="px-6 py-4 border-t-2 border-orange-200 bg-gradient-to-r from-orange-50 to-white rounded-b-3xl">
            <ChatTextarea
              value={inputValue}
              onChange={setInputValue}
              onSend={handleSend}
              disabled={isLoading}
              placeholder="Type your message..."
            />
          </div>
          )}
        </div>
      </div>
    </>
  );
}
