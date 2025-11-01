export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface TripPlan {
  id: string;
  destination: string;
  duration: number;
  budget: number;
  currency: string;
  startDate?: string;
  endDate?: string;
  travelers: number;
  type: 'solo' | 'couple' | 'family' | 'group' | 'business';
  preferences?: string[];
  itinerary: DayPlan[];
  flights?: FlightOption[];
  hotels?: HotelOption[];
  packingList?: string[];
  tips?: string[];
  createdAt: Date;
}

export interface DayPlan {
  day: number;
  date?: string;
  activities: Activity[];
  meals?: Meal[];
  accommodation?: string;
}

export interface Activity {
  time: string;
  title: string;
  description: string;
  location?: string;
  cost?: number;
  duration?: string;
  category: 'sightseeing' | 'dining' | 'adventure' | 'relaxation' | 'culture' | 'shopping' | 'transport';
}

export interface Meal {
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  suggestion: string;
  location?: string;
  estimatedCost?: number;
}

export interface FlightOption {
  id: string;
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  price: number;
  currency: string;
  airline?: string;
  duration?: string;
  stops?: number;
  bookingLink?: string;
}

export interface HotelOption {
  id: string;
  name: string;
  location: string;
  rating?: number;
  price: number;
  currency: string;
  pricePerNight: number;
  nights: number;
  amenities?: string[];
  bookingLink?: string;
  imageUrl?: string;
}

export interface VisaRequirement {
  country: string;
  required: boolean;
  type?: string;
  processingTime?: string;
  cost?: number;
  documents?: string[];
  notes?: string;
}

export interface ChatRequest {
  message: string;
  conversationHistory?: Message[];
  context?: {
    currentTrip?: Partial<TripPlan>;
  };
}

export interface ChatResponse {
  message: string;
  tripPlan?: TripPlan;
  suggestions?: string[];
  error?: string;
}
