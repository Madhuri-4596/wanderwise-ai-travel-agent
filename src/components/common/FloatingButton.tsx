'use client';

import { useState } from 'react';
import IconMenu from '../layouts/IconMenu';

export default function FloatingButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Icon Menu */}
      <IconMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {/* Floating Button with Sakura Theme */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-full shadow-2xl hover:shadow-pink-400/50 transition-all duration-500 transform hover:scale-110 z-50 flex items-center justify-center group ${
          isOpen ? 'rotate-45' : ''
        }`}
        aria-label="Open travel menu"
      >
        {isOpen ? (
          <span className="text-3xl font-bold">×</span>
        ) : (
          <span className="text-2xl animate-bounce-slow">🌸</span>
        )}
      </button>
    </>
  );
}
