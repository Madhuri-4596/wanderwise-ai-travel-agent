'use client';

import { useRouter } from 'next/navigation';

interface IconMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Category {
  id: string;
  icon: string;
  label: string;
  route: string;
}

const travelCategories: Category[] = [
  { id: 'flights', icon: '✈️', label: 'Flights', route: '/chat?mode=flights' },
  { id: 'hotels', icon: '🏨', label: 'Hotels', route: '/chat?mode=hotels' },
  { id: 'explore', icon: '🗺️', label: 'Explore', route: '/chat?mode=explore' },
  { id: 'plan', icon: '📅', label: 'Plan', route: '/chat?mode=plan' },
  { id: 'chat', icon: '💬', label: 'Chat', route: '/chat' },
  { id: 'journal', icon: '✏️', label: 'Journal', route: '/chat?mode=journal' },
];

export default function IconMenu({ isOpen, onClose }: IconMenuProps) {
  const router = useRouter();

  const handleCategoryClick = (route: string) => {
    router.push(route);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/10 backdrop-blur-sm z-40 animate-fade-in-up"
        onClick={onClose}
      />

      {/* Icon Menu Grid */}
      <div className="fixed bottom-32 right-8 z-50 animate-fade-in-up">
        <div className="glass-strong p-6 rounded-3xl shadow-warm">
          <h3 className="text-center text-sm font-bold gradient-text mb-4">
            choose your adventure ☀️
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {travelCategories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.route)}
                className="
                  group
                  flex flex-col items-center justify-center
                  w-20 h-20
                  btn-butter
                  rounded-2xl
                  shadow-warm hover:shadow-2xl
                  transform hover:scale-110 hover:-translate-y-2
                  transition-all duration-300
                  animate-fade-in-up
                  hover-glow
                "
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="text-3xl mb-1 group-hover:scale-125 transition-transform duration-300">
                  {category.icon}
                </span>
                <span className="text-xs font-semibold drop-shadow-sm">
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
