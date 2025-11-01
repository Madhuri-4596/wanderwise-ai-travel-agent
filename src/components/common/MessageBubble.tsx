'use client';

interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
}

export default function MessageBubble({ message, isUser, timestamp }: MessageBubbleProps) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in-up`}>
      <div
        className={`max-w-[70%] rounded-3xl px-6 py-4 shadow-lg ${
          isUser
            ? 'bg-gradient-to-r from-pink-400 to-rose-400 text-white'
            : 'bg-white/90 backdrop-blur-md text-gray-800 border-2 border-pink-200'
        } transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1`}
      >
        {/* Sakura glow effect for AI messages */}
        {!isUser && (
          <div className="absolute inset-0 bg-gradient-to-r from-pink-300/10 to-rose-300/10 rounded-3xl blur-sm -z-10"></div>
        )}

        <p className="text-base leading-relaxed whitespace-pre-wrap">{message}</p>

        {timestamp && (
          <p
            className={`text-xs mt-2 ${
              isUser ? 'text-pink-100' : 'text-pink-400'
            }`}
          >
            {timestamp}
          </p>
        )}
      </div>
    </div>
  );
}
