'use client';

import React from 'react';
import { TravelFeature } from '@/types';

interface IconGridProps {
  onFeatureClick: (featureId: string) => void;
}

// Premium SVG Icons
const Icons = {
  flights: (
    <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12">
      <path d="M22 16.21V19C22 20.1 21.1 21 20 21H4C2.9 21 2 20.1 2 19V16.21C2 15.76 2.21 15.34 2.58 15.08L6 12.5V4.5C6 3.67 6.67 3 7.5 3H8.5C9.33 3 10 3.67 10 4.5V9L14 6.5V4.5C14 3.67 14.67 3 15.5 3H16.5C17.33 3 18 3.67 18 4.5V6.5L22 9V4.5C22 3.67 21.33 3 20.5 3H19.5C18.67 3 18 3.67 18 4.5V12.5L21.42 15.08C21.79 15.34 22 15.76 22 16.21Z" fill="currentColor"/>
    </svg>
  ),
  hotels: (
    <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12">
      <path d="M7 13C8.66 13 10 11.66 10 10C10 8.34 8.66 7 7 7C5.34 7 4 8.34 4 10C4 11.66 5.34 13 7 13ZM19 7H11V15H3V5H1V20H3V17H21V20H23V11C23 8.79 21.21 7 19 7Z" fill="currentColor"/>
    </svg>
  ),
  rides: (
    <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12">
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H6.5C5.84 5 5.29 5.42 5.08 6.01L3 12V20C3 20.55 3.45 21 4 21H5C5.55 21 6 20.55 6 20V19H18V20C18 20.55 18.45 21 19 21H20C20.55 21 21 20.55 21 20V12L18.92 6.01ZM6.5 16C5.67 16 5 15.33 5 14.5C5 13.67 5.67 13 6.5 13C7.33 13 8 13.67 8 14.5C8 15.33 7.33 16 6.5 16ZM17.5 16C16.67 16 16 15.33 16 14.5C16 13.67 16.67 13 17.5 13C18.33 13 19 13.67 19 14.5C19 15.33 18.33 16 17.5 16ZM5 11L6.5 6.5H17.5L19 11H5Z" fill="currentColor"/>
    </svg>
  ),
  nearby: (
    <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12">
      <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
    </svg>
  ),
  aiAgent: (
    <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12">
      <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM9 11H7V9H9V11ZM13 11H11V9H13V11ZM17 11H15V9H17V11Z" fill="currentColor"/>
    </svg>
  ),
  trips: (
    <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12">
      <path d="M20 6H16V4C16 2.89 15.11 2 14 2H10C8.89 2 8 2.89 8 4V6H4C2.89 6 2.01 6.89 2.01 8L2 19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V8C22 6.89 21.11 6 20 6ZM14 6H10V4H14V6Z" fill="currentColor"/>
    </svg>
  ),
};

const travelFeatures: TravelFeature[] = [
  {
    id: 'flights',
    title: 'Flights',
    icon: 'flights',
    description: 'Search and book flights',
    route: '/chat/flights',
  },
  {
    id: 'hotels',
    title: 'Hotels',
    icon: 'hotels',
    description: 'Find perfect accommodations',
    route: '/chat/hotels',
  },
  {
    id: 'rides',
    title: 'Rides',
    icon: 'rides',
    description: 'Book transportation',
    route: '/chat/rides',
  },
  {
    id: 'nearby',
    title: 'Nearby Spots',
    icon: 'nearby',
    description: 'Discover local attractions',
    route: '/chat/nearby',
  },
  {
    id: 'ai-agent',
    title: 'AI Travel Agent',
    icon: 'aiAgent',
    description: 'Chat with AI assistant',
    route: '/chat/ai-agent',
  },
  {
    id: 'trips',
    title: 'My Trips',
    icon: 'trips',
    description: 'View your itineraries',
    route: '/chat/trips',
  },
];

export default function IconGrid({ onFeatureClick }: IconGridProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-8 py-16">
      {/* Luxury Header */}
      <div className="text-center mb-20">
        <h1 className="text-7xl font-black text-sunset-text mb-4 tracking-[0.15em]">
          LUNO TRAVEL AGENT
        </h1>
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-sunset-accent to-transparent mx-auto mb-6" />
        <p className="text-xl text-sunset-text/70 tracking-wide font-bold mb-2">
          Your Best Trip Budget Bot
        </p>
        <p className="text-sm text-sunset-text/50 tracking-[0.2em] uppercase font-semibold">
          Smart Travel • Best Prices • AI Powered
        </p>
      </div>

      {/* Premium Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {travelFeatures.map((feature, index) => (
          <button
            key={feature.id}
            onClick={() => onFeatureClick(feature.id)}
            className="group relative overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Card Background */}
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-12
                            border border-sunset-accent/10
                            shadow-[0_8px_30px_rgb(0,0,0,0.04)]
                            hover:shadow-[0_20px_60px_rgb(255,127,80,0.15)]
                            transition-all duration-500 ease-out
                            hover:-translate-y-2">

              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent
                              opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl" />

              {/* Border glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sunset-accent/0 to-sunset-accent/5
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col items-center">
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-sunset-accent via-orange-500 to-orange-600
                                  flex items-center justify-center
                                  shadow-[0_10px_40px_rgba(255,127,80,0.3)]
                                  group-hover:shadow-[0_15px_50px_rgba(255,127,80,0.5)]
                                  group-hover:scale-110
                                  transition-all duration-500">
                    <div className="text-white">
                      {Icons[feature.icon as keyof typeof Icons]}
                    </div>
                  </div>

                  {/* Animated glow */}
                  <div className="absolute inset-0 rounded-xl bg-sunset-accent/30 blur-2xl
                                  scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-60
                                  transition-all duration-700" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-sunset-text tracking-wide
                               group-hover:text-sunset-accent transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Underline */}
                <div className="w-0 h-px bg-sunset-accent mt-3
                                group-hover:w-16 transition-all duration-500" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
