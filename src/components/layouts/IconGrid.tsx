'use client';

import Link from 'next/link';

interface Agent {
  id: string;
  icon: string;
  label: string;
  description: string;
  borderColor: string;
  hoverBg: string;
}

const agents: Agent[] = [
  { id: 'flights', icon: '✈️', label: 'Flights', description: 'Find and book flights', borderColor: 'border-blue-400', hoverBg: 'hover:bg-blue-50' },
  { id: 'hotels', icon: '🏨', label: 'Hotels', description: 'Discover cozy stays', borderColor: 'border-purple-400', hoverBg: 'hover:bg-purple-50' },
  { id: 'rides', icon: '🚗', label: 'Rides', description: 'Car & bike rentals', borderColor: 'border-green-400', hoverBg: 'hover:bg-green-50' },
  { id: 'nearby', icon: '📍', label: 'Nearby Spots', description: 'Cafes, views, secret places', borderColor: 'border-orange-400', hoverBg: 'hover:bg-orange-50' },
  { id: 'ai-agent', icon: '💬', label: 'AI Travel Agent', description: 'Chat to plan trips', borderColor: 'border-pink-400', hoverBg: 'hover:bg-pink-50' },
  { id: 'my-trips', icon: '🎒', label: 'My Trips', description: 'Saved plans & itineraries', borderColor: 'border-teal-400', hoverBg: 'hover:bg-teal-50' },
];

export default function IconGrid() {
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-8 max-w-6xl mx-auto px-4">
      {agents.map((agent, index) => (
        <Link
          key={agent.id}
          href={`/chat/${agent.id}`}
          className={`
            bg-white
            rounded-2xl
            p-8
            shadow-lg
            hover:shadow-2xl
            border-4
            ${agent.borderColor}
            ${agent.hoverBg}
            transition-all
            duration-300
            hover:scale-105
            hover:-translate-y-2
            animate-fade-in-up
            flex
            flex-col
            items-center
            justify-center
            text-center
            group
            cursor-pointer
            h-[200px]
          `}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Icon */}
          <div className="text-6xl mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
            {agent.icon}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {agent.label}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600">
            {agent.description}
          </p>
        </Link>
      ))}
    </div>
  );
}
