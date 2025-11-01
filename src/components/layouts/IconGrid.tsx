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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
      {agents.map((agent, index) => (
        <Link
          key={agent.id}
          href={`/chat/${agent.id}`}
          className="
            bg-white/90
            backdrop-blur-md
            rounded-xl
            p-6
            shadow-md
            hover:shadow-xl
            border
            border-butter/20
            hover:border-glow/40
            transition-all
            duration-200
            hover:scale-105
            hover:bg-white
            animate-fade-in-up
            flex
            flex-col
            items-center
            text-center
            group
            cursor-pointer
            min-h-[160px]
          "
          style={{ animationDelay: `${index * 0.08}s` }}
        >
          {/* Icon */}
          <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-200">
            {agent.icon}
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-charcoal mb-1 group-hover:text-glow transition-colors">
            {agent.label}
          </h3>

          {/* Description */}
          <p className="text-sm text-charcoal-light leading-snug">
            {agent.description}
          </p>
        </Link>
      ))}
    </div>
  );
}
