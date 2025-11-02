'use client';

import React, { useState } from 'react';
import IconGrid from '@/components/layouts/IconGrid';
import ChatWindow from '@/components/layouts/ChatWindow';
import FloatingWindow from '@/components/layouts/FloatingWindow';

const featureTitles: Record<string, string> = {
  flights: 'Flight Search',
  hotels: 'Hotel Booking',
  rides: 'Transportation',
  nearby: 'Nearby Attractions',
  'ai-agent': 'AI Travel Agent',
  trips: 'My Trips',
};

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeAgent, setActiveAgent] = useState<string>('ai-agent');

  const handleFeatureClick = (featureId: string) => {
    setActiveAgent(featureId);
    setIsChatOpen(true);
  };

  const handleFloatingButtonClick = () => {
    setActiveAgent('ai-agent');
    setIsChatOpen(true);
  };

  return (
    <main className="min-h-screen bg-transparent">
      {/* Main grid of 6 feature boxes */}
      <IconGrid onFeatureClick={handleFeatureClick} />

      {/* Floating button for quick AI access */}
      {!isChatOpen && <FloatingWindow onOpen={handleFloatingButtonClick} />}

      {/* Chat window that slides up from bottom */}
      <ChatWindow
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        agentType={activeAgent}
        agentTitle={featureTitles[activeAgent] || 'AI Assistant'}
      />
    </main>
  );
}
