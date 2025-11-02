'use client';

import React, { KeyboardEvent } from 'react';

interface ChatTextareaProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function ChatTextarea({
  value,
  onChange,
  onSend,
  placeholder = "Type your message...",
  disabled = false,
}: ChatTextareaProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) {
        onSend();
      }
    }
  };

  return (
    <div className="relative w-full">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        rows={3}
        className="w-full px-4 py-3 pr-12 rounded-2xl border-2 border-sunset-accent/20
                   bg-white text-sunset-text placeholder-sunset-text/40
                   focus:outline-none focus:border-sunset-accent focus:ring-2 focus:ring-sunset-accent/20
                   resize-none smooth-transition disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        onClick={onSend}
        disabled={disabled || !value.trim()}
        className="absolute right-3 bottom-3 p-2 rounded-lg bg-sunset-accent text-white
                   hover:bg-sunset-accent/90 disabled:opacity-50 disabled:cursor-not-allowed
                   smooth-transition"
        aria-label="Send message"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
      </button>
    </div>
  );
}
