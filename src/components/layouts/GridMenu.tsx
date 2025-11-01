'use client';

import { useState } from 'react';
import ChatWindow from './ChatWindow';

interface GridItem {
  id: string;
  icon: string;
  label: string;
  description: string;
}

const travelFeatures: GridItem[] = [
  { id: 'flights', icon: '✈️', label: 'Flights', description: 'Find and book flights' },
  { id: 'hotels', icon: '🏨', label: 'Hotels', description: 'Discover cozy stays' },
  { id: 'rides', icon: '🚗', label: 'Rides', description: 'Car & bike rentals' },
  { id: 'nearby', icon: '📍', label: 'Nearby Spots', description: 'Cafes, views, secret places' },
  { id: 'ai-agent', icon: '💬', label: 'AI Travel Agent', description: 'Chat to plan trips' },
  { id: 'my-trips', icon: '🎒', label: 'My Trips', description: 'Saved plans & itineraries' },
];

export default function GridMenu() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const handleBoxClick = (id: string) => {
    setSelectedFeature(id);
  };

  const handleClose = () => {
    setSelectedFeature(null);
  };

  return (
    <>
      {/* 6-Box Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
        {travelFeatures.map((feature, index) => (
          <button
            key={feature.id}
            onClick={() => handleBoxClick(feature.id)}
            className="
              glass-strong
              p-8
              rounded-3xl
              shadow-warm
              hover:shadow-2xl
              transition-all
              duration-300
              transform
              hover:-translate-y-2
              hover:scale-105
              animate-fade-in-up
              text-left
              group
            "
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-charcoal mb-2 group-hover:text-glow transition-colors">
              {feature.label}
            </h3>
            <p className="text-sm text-charcoal-light">
              {feature.description}
            </p>
          </button>
        ))}
      </div>

      {/* Chat Window Overlay */}
      {selectedFeature && (
        <ChatWindow
          isOpen={!!selectedFeature}
          onClose={handleClose}
          featureId={selectedFeature}
          featureName={travelFeatures.find(f => f.id === selectedFeature)?.label || ''}
        />
      )}
    </>
  );
}
