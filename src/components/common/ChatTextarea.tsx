'use client';

import { useState, KeyboardEvent } from 'react';

interface ChatTextareaProps {
  onSend: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function ChatTextarea({
  onSend,
  placeholder = "✨ Tell me about your dream destination...",
  disabled = false
}: ChatTextareaProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative">
      {/* Butter glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-butter/20 to-glow/20 rounded-3xl blur-xl"></div>

      <div className="relative bg-white/90 backdrop-blur-md rounded-3xl border-2 border-butter/40 shadow-xl p-4 transition-all duration-300 focus-within:border-glow focus-within:shadow-2xl">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          rows={3}
          className="w-full bg-transparent resize-none focus:outline-none text-charcoal placeholder-charcoal-light/50 text-lg leading-relaxed"
        />

        {/* Send Button */}
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-charcoal-light">
            Press Enter to send, Shift+Enter for new line
          </span>
          <button
            onClick={handleSend}
            disabled={disabled || !message.trim()}
            className="px-6 py-2 bg-gradient-to-r from-glow to-butter text-charcoal rounded-full font-bold shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
          >
            <span className="flex items-center gap-2">
              Send ✨
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
