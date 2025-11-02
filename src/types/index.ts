export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface TravelFeature {
  id: string;
  title: string;
  icon: string;
  description: string;
  route: string;
}

export type AgentType = 'flights' | 'hotels' | 'rides' | 'nearby' | 'ai-agent' | 'trips';
