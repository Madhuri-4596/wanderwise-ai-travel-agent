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
    <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto px-4">
      {agents.map((agent, index) => (
        <Link
          key={agent.id}
          href={`/chat/${agent.id}`}
          className="
            glass-strong
            p-10
            rounded-3xl
            shadow-warm
            hover:shadow-2xl
            transition-all
            duration-300
            transform
            hover:-translate-y-3
            hover:scale-110
            animate-fade-in-up
            flex
            flex-col
            items-center
            text-center
            group
            cursor-pointer
          "
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="text-6xl mb-3 transform group-hover:scale-125 transition-transform duration-300 group-hover:animate-bounce-soft">
            {agent.icon}
          </div>
          <h3 className="text-lg font-bold text-charcoal mb-1 group-hover:text-glow transition-colors">
            {agent.label}
          </h3>
          <p className="text-xs text-charcoal-light group-hover:text-charcoal transition-colors">
            {agent.description}
          </p>
        </Link>
      ))}
    </div>
  );
}
