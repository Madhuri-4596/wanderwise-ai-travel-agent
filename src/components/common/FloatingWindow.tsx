'use client';

import { useState } from 'react';
import IconMenu from '../layouts/IconMenu';

export default function FloatingWindow() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Icon Menu - 6 icons */}
      <IconMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {/* Floating Wonderlust Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          fixed bottom-8 right-8 w-20 h-20
          glass-strong rounded-full
          shadow-warm
          transition-all duration-500
          transform hover:scale-110
          z-50
          flex items-center justify-center
          group
          animate-glow hover-glow
          ${isOpen ? 'rotate-180 scale-90' : 'animate-bounce-soft'}
        `}
        aria-label="Open Wonderlust menu"
      >
        {isOpen ? (
          <span className="text-4xl font-bold gradient-text">×</span>
        ) : (
          <div className="relative flex flex-col items-center justify-center">
            <span className="text-4xl animate-float">☀️</span>
            <span className="text-xs font-bold gradient-text mt-1">Wonder</span>
          </div>
        )}
      </button>

      {/* Optional: Tooltip hint */}
      {!isOpen && (
        <div className="fixed bottom-8 right-32 glass px-4 py-2 rounded-full text-sm font-semibold text-charcoal animate-fade-in-up pointer-events-none z-40 hidden md:block">
          Where shall we wander? ☀️
        </div>
      )}
    </>
  );
}
