'use client';

import { TripPlan } from '@/types';
import Link from 'next/link';

interface Props {
  trip: TripPlan;
}

export default function TripItinerary({ trip }: Props) {
  return (
    <div className="min-h-screen bg-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/chat" className="text-electric-cyan hover:text-indigo-600 mb-4 inline-block font-semibold">
            ← Back to Chat
          </Link>
          <div className="bg-gradient-to-r from-indigo-600 to-deep-indigo rounded-2xl shadow-glow-indigo p-8">
            <h1 className="text-4xl font-bold mb-2 text-white">
              {trip.destination}
            </h1>
            <div className="flex flex-wrap gap-4 text-indigo-100 mt-4">
              <div className="flex items-center gap-2">
                <span>📅</span>
                <span>{trip.duration} days</span>
              </div>
              <div className="flex items-center gap-2">
                <span>💰</span>
                <span>{trip.currency} {trip.budget.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>👥</span>
                <span>{trip.travelers} traveler{trip.travelers > 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✈️</span>
                <span className="capitalize">{trip.type} trip</span>
              </div>
            </div>
          </div>
        </div>

        {/* Flights Section */}
        {trip.flights && trip.flights.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-indigo-900">✈️ Flights</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {trip.flights.map((flight) => (
                <div key={flight.id} className="bg-indigo-50 rounded-xl shadow-md p-6 border border-indigo-100 hover:border-electric-cyan hover:shadow-glow-cyan transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-semibold text-lg text-indigo-900">{flight.airline || 'Airlines'}</p>
                      <p className="text-sm text-indigo-700">
                        {flight.origin} → {flight.destination}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-electric-cyan">
                        {flight.currency} {flight.price}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-indigo-700 mb-4">
                    <span>{flight.duration}</span>
                    <span>{flight.stops === 0 ? 'Direct' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}</span>
                  </div>
                  {flight.bookingLink && (
                    <a
                      href={flight.bookingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center bg-coral-600 text-white py-2 rounded-lg hover:bg-coral-500 hover:shadow-glow-cyan transition"
                    >
                      Book Now
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Hotels Section */}
        {trip.hotels && trip.hotels.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-indigo-900">🏨 Accommodation</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {trip.hotels.map((hotel) => (
                <div key={hotel.id} className="bg-indigo-50 rounded-xl shadow-md overflow-hidden border border-indigo-100 hover:border-electric-cyan hover:shadow-glow-cyan transition-all">
                  {hotel.imageUrl && (
                    <div className="h-48 bg-indigo-100 overflow-hidden">
                      <img
                        src={hotel.imageUrl}
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg text-indigo-900">{hotel.name}</h3>
                        <p className="text-sm text-indigo-700">{hotel.location}</p>
                        {hotel.rating && (
                          <p className="text-sm text-electric-cyan mt-1 font-semibold">
                            ⭐ {hotel.rating}/5
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-electric-cyan">
                          {hotel.currency} {hotel.price}
                        </p>
                        <p className="text-xs text-indigo-600">
                          {hotel.pricePerNight}/night
                        </p>
                      </div>
                    </div>
                    {hotel.amenities && hotel.amenities.length > 0 && (
                      <div className="mt-3 mb-4">
                        <div className="flex flex-wrap gap-2">
                          {hotel.amenities.slice(0, 4).map((amenity, idx) => (
                            <span key={idx} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded border border-indigo-200">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {hotel.bookingLink && (
                      <a
                        href={hotel.bookingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center bg-coral-600 text-white py-2 rounded-lg hover:bg-coral-500 hover:shadow-glow-cyan transition"
                      >
                        Book Now
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Daily Itinerary */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-indigo-900">📅 Daily Itinerary</h2>
          <div className="space-y-6">
            {trip.itinerary.map((day) => (
              <div key={day.day} className="bg-indigo-50 rounded-xl shadow-md p-6 border border-indigo-100">
                <h3 className="text-xl font-bold mb-4 text-indigo-900">
                  Day {day.day} {day.date && `- ${day.date}`}
                </h3>
                <div className="space-y-4">
                  {day.activities.map((activity, idx) => (
                    <div key={idx} className="flex gap-4 pb-4 border-b border-indigo-100 last:border-0">
                      <div className="flex-shrink-0 w-20 text-sm font-semibold text-indigo-700">
                        {activity.time}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-indigo-900 mb-1">
                          {activity.title}
                        </h4>
                        <p className="text-sm text-indigo-700 mb-2">
                          {activity.description}
                        </p>
                        <div className="flex gap-3 text-xs text-indigo-600">
                          {activity.location && (
                            <span>📍 {activity.location}</span>
                          )}
                          {activity.duration && (
                            <span>⏱️ {activity.duration}</span>
                          )}
                          {activity.cost && (
                            <span>💵 {trip.currency} {activity.cost}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Packing List */}
        {trip.packingList && trip.packingList.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-indigo-900">🧳 Packing List</h2>
            <div className="bg-indigo-50 rounded-xl shadow-md p-6">
              <div className="grid md:grid-cols-2 gap-3">
                {trip.packingList.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-blue-600" />
                    <span className="text-indigo-900">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Travel Tips */}
        {trip.tips && trip.tips.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-indigo-900">💡 Travel Tips</h2>
            <div className="bg-indigo-50 rounded-xl shadow-md p-6">
              <ul className="space-y-3">
                {trip.tips.map((tip, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-blue-600">•</span>
                    <span className="text-indigo-900">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mt-8">
          <button className="bg-coral-600 text-white px-6 py-3 rounded-lg hover:bg-coral-500 transition">
            📥 Download PDF
          </button>
          <button className="bg-electric-cyan text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition">
            🔗 Share Trip
          </button>
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-electric-cyan transition">
            ✏️ Edit Plan
          </button>
        </div>
      </div>
    </div>
  );
}
