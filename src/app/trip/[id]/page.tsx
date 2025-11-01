'use client';

import { use } from 'react';
import TripItinerary from '@/components/TripItinerary';
import { TripPlan } from '@/types';

// Mock trip data for demo purposes
// In production, fetch this from a database or API
const mockTrip: TripPlan = {
  id: '1',
  destination: 'Bali, Indonesia',
  duration: 5,
  budget: 1500,
  currency: 'USD',
  startDate: '2025-12-15',
  endDate: '2025-12-20',
  travelers: 2,
  type: 'couple',
  preferences: ['beach', 'culture', 'food'],
  itinerary: [
    {
      day: 1,
      date: 'Dec 15, 2025',
      activities: [
        {
          time: '10:00 AM',
          title: 'Arrival & Hotel Check-in',
          description: 'Arrive at Ngurah Rai International Airport and transfer to your hotel in Seminyak',
          location: 'Seminyak',
          duration: '2 hours',
          cost: 25,
          category: 'transport',
        },
        {
          time: '1:00 PM',
          title: 'Lunch at Warung Local',
          description: 'Try authentic Balinese cuisine at a local warung',
          location: 'Seminyak Beach',
          cost: 15,
          category: 'dining',
        },
        {
          time: '3:00 PM',
          title: 'Seminyak Beach Relaxation',
          description: 'Spend the afternoon relaxing on the beautiful Seminyak Beach',
          location: 'Seminyak Beach',
          duration: '3 hours',
          cost: 0,
          category: 'relaxation',
        },
        {
          time: '7:00 PM',
          title: 'Sunset Dinner',
          description: 'Enjoy dinner with ocean views at La Plancha Beach Bar',
          location: 'Seminyak',
          cost: 40,
          category: 'dining',
        },
      ],
    },
    {
      day: 2,
      date: 'Dec 16, 2025',
      activities: [
        {
          time: '8:00 AM',
          title: 'Ubud Day Trip',
          description: 'Full day tour to Ubud including Monkey Forest, Rice Terraces, and temples',
          location: 'Ubud',
          duration: '8 hours',
          cost: 60,
          category: 'sightseeing',
        },
        {
          time: '12:30 PM',
          title: 'Lunch at Sari Organik',
          description: 'Farm-to-table lunch overlooking rice paddies',
          location: 'Ubud',
          cost: 20,
          category: 'dining',
        },
        {
          time: '6:00 PM',
          title: 'Traditional Balinese Massage',
          description: 'Relax with a traditional massage at a local spa',
          location: 'Ubud',
          duration: '1.5 hours',
          cost: 25,
          category: 'relaxation',
        },
      ],
    },
    {
      day: 3,
      date: 'Dec 17, 2025',
      activities: [
        {
          time: '5:00 AM',
          title: 'Mount Batur Sunrise Trek',
          description: 'Hike up Mount Batur to watch the spectacular sunrise',
          location: 'Kintamani',
          duration: '5 hours',
          cost: 50,
          category: 'adventure',
        },
        {
          time: '1:00 PM',
          title: 'Coffee Plantation Visit',
          description: 'Tour a traditional coffee plantation and taste Luwak coffee',
          location: 'Kintamani',
          duration: '2 hours',
          cost: 15,
          category: 'culture',
        },
        {
          time: '7:00 PM',
          title: 'Kecak Fire Dance Performance',
          description: 'Watch the traditional Kecak dance at Uluwatu Temple',
          location: 'Uluwatu',
          cost: 10,
          category: 'culture',
        },
      ],
    },
  ],
  flights: [
    {
      id: 'f1',
      origin: 'LAX',
      destination: 'DPS',
      departureDate: '2025-12-15',
      returnDate: '2025-12-20',
      price: 650,
      currency: 'USD',
      airline: 'Singapore Airlines',
      duration: '18h 30m',
      stops: 1,
      bookingLink: 'https://www.skyscanner.com/transport/flights/lax/dps/251215/251220/',
    },
  ],
  hotels: [
    {
      id: 'h1',
      name: 'Seminyak Beach Resort & Spa',
      location: 'Seminyak, Bali',
      rating: 4.5,
      price: 450,
      currency: 'USD',
      pricePerNight: 90,
      nights: 5,
      amenities: ['Pool', 'WiFi', 'Spa', 'Beach Access', 'Restaurant'],
      bookingLink: 'https://www.booking.com/hotel/id/seminyak-beach-resort.html',
      imageUrl: 'https://source.unsplash.com/800x600/?bali,hotel',
    },
  ],
  packingList: [
    'Passport & visa documents',
    'Sunscreen SPF 50+',
    'Lightweight clothing',
    'Swimwear',
    'Comfortable walking shoes',
    'Hiking boots (for Mount Batur)',
    'Insect repellent',
    'Travel adapter (Type C/F)',
    'Camera',
    'Light jacket for temples',
    'Reusable water bottle',
    'First aid kit',
  ],
  tips: [
    'Dress modestly when visiting temples (cover shoulders and knees)',
    'Always carry small bills (IDR) for local markets and warungs',
    'Download Google Maps offline for easier navigation',
    'Best time to visit is during dry season (April - October)',
    'Hire a scooter for easy transportation, but be cautious of traffic',
    'Try local food at warungs - they\'re cheap and authentic',
    'Book Mount Batur trek in advance during peak season',
    'Negotiate prices at markets and with taxi drivers',
  ],
  createdAt: new Date(),
};

export default function TripPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);

  // In production, fetch trip data based on resolvedParams.id
  // const trip = await fetchTripById(resolvedParams.id);

  return <TripItinerary trip={mockTrip} />;
}
