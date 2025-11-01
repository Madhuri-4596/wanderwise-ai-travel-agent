'use client';

import { useRouter } from 'next/navigation';

interface IconMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const travelCategories = [
  { id: 'flights', icon: '✈️', label: 'Flights', color: 'from-pink-400 to-rose-400' },
  { id: 'hotels', icon: '🏨', label: 'Hotels', color: 'from-rose-400 to-pink-400' },
  { id: 'itinerary', icon: '🗺️', label: 'Itinerary', color: 'from-pink-300 to-rose-300' },
  { id: 'activities', icon: '🎭', label: 'Activities', color: 'from-rose-300 to-pink-300' },
  { id: 'restaurants', icon: '🍽️', label: 'Dining', color: 'from-pink-400 to-rose-300' },
  { id: 'budget', icon: '💰', label: 'Budget', color: 'from-rose-400 to-pink-300' },
];

export default function IconMenu({ isOpen, onClose }: IconMenuProps) {
  const router = useRouter();

  const handleIconClick = (category: string) => {
    router.push(`/chat?category=${category}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Icon Menu Grid */}
      <div className="fixed bottom-28 right-8 z-50 animate-fade-in-up">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-pink-200">
          <h3 className="text-center text-lg font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-4">
            🌸 Choose Your Journey
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {travelCategories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => handleIconClick(category.id)}
                className={`group relative w-20 h-20 bg-gradient-to-br ${category.color} rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 animate-float`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="text-3xl absolute inset-0 flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                  {category.icon}
                </span>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-pink-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {category.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
