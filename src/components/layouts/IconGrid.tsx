'use client';

import Link from 'next/link';

interface Agent {
  id: string;
  icon: string;
  label: string;
  description: string;
}

const agents: Agent[] = [
  { id: 'flights', icon: '✈️', label: 'Flights', description: 'Find and book flights' },
  { id: 'hotels', icon: '🏨', label: 'Hotels', description: 'Discover cozy stays' },
  { id: 'rides', icon: '🚗', label: 'Rides', description: 'Car & bike rentals' },
  { id: 'nearby', icon: '📍', label: 'Nearby Spots', description: 'Cafes, views, secret places' },
  { id: 'ai-agent', icon: '💬', label: 'AI Travel Agent', description: 'Chat to plan trips' },
  { id: 'my-trips', icon: '🎒', label: 'My Trips', description: 'Saved plans & itineraries' },
];

export default function IconGrid() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {agents.map((agent, index) => (
        <Link
          key={agent.id}
          href={`/chat/${agent.id}`}
          className="
            bg-gray-50
            hover:bg-gray-100
            rounded-xl
            py-8
            px-6
            flex
            flex-col
            items-center
            justify-center
            text-center
            shadow-sm
            cursor-pointer
            transition-all
            duration-200
            hover:scale-105
            animate-fade-in-up
          "
          style={{ animationDelay: `${index * 0.08}s` }}
        >
          {/* Icon in dark square */}
          <div className="bg-[#4b2e2b] text-white text-3xl p-3 rounded-lg mb-3">
            {agent.icon}
          </div>

          {/* Title */}
          <h2 className="font-semibold text-gray-800 mb-1">
            {agent.label}
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-sm">
            {agent.description}
          </p>
        </Link>
      ))}
    </div>
  );
}
