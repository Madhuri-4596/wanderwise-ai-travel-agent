'use client';

import React, { useState } from 'react';

interface FloatingWindowProps {
  onOpen: () => void;
}

export default function FloatingWindow({ onOpen }: FloatingWindowProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onOpen}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-8 right-8 z-30 group"
      aria-label="Open AI Travel Assistant"
    >
      <div className="relative">
        {/* Floating button */}
        <div
          className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sunset-accent via-orange-500 to-orange-600
                     shadow-[0_10px_40px_rgba(255,127,80,0.4)]
                     hover:shadow-[0_20px_60px_rgba(255,127,80,0.6)]
                     flex items-center justify-center text-white
                     transition-all duration-500 hover:scale-110 hover:-translate-y-1 cursor-pointer
                     border border-white/20"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10">
            <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM9 11H7V9H9V11ZM13 11H11V9H13V11ZM17 11H15V9H17V11Z" fill="currentColor"/>
          </svg>
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-sunset-accent/40 blur-2xl
                        scale-90 group-hover:scale-125 transition-all duration-700" />

        {/* Pulse ring */}
        <div
          className={`absolute inset-0 rounded-2xl border-2 border-sunset-accent/50
                     scale-100 ${isHovered ? 'animate-ping opacity-75' : 'opacity-0'}
                     transition-opacity duration-300`}
        />
      </div>
    </button>
  );
}
