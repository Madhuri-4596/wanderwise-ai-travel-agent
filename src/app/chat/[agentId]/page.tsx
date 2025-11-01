import { notFound } from 'next/navigation';
import FloatingChatWindow from '@/components/layouts/FloatingChatWindow';

interface Agent {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const agents: Record<string, Agent> = {
  'flights': {
    id: 'flights',
    name: 'Flights',
    icon: '✈️',
    description: 'Find and book the best flight deals for your trip.'
  },
  'hotels': {
    id: 'hotels',
    name: 'Hotels',
    icon: '🏨',
    description: 'Discover cozy stays that match your vibe.'
  },
  'rides': {
    id: 'rides',
    name: 'Rides',
    icon: '🚗',
    description: 'Get car and bike rentals for your adventure.'
  },
  'nearby': {
    id: 'nearby',
    name: 'Nearby Spots',
    icon: '📍',
    description: 'Explore cafes, views, and secret places.'
  },
  'ai-agent': {
    id: 'ai-agent',
    name: 'AI Travel Agent',
    icon: '💬',
    description: 'Your personal travel planning assistant.'
  },
  'my-trips': {
    id: 'my-trips',
    name: 'My Trips',
    icon: '🎒',
    description: 'Manage your saved plans and itineraries.'
  },
};

interface PageProps {
  params: Promise<{ agentId: string }>;
}

export async function generateStaticParams() {
  return Object.keys(agents).map((agentId) => ({
    agentId,
  }));
}

export default async function ChatPage({ params }: PageProps) {
  const { agentId } = await params;
  const agent = agents[agentId];

  if (!agent) {
    notFound();
  }

  return (
    <FloatingChatWindow
      agentId={agent.id}
      agentName={agent.name}
      agentIcon={agent.icon}
      agentDescription={agent.description}
    />
  );
}
