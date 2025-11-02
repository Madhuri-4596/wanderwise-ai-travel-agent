/**
 * Travelpayouts Affiliate Integration
 * Utilities for generating affiliate links for flights, hotels, and transportation
 */

const TRAVELPAYOUTS_MARKER_ID = process.env.TRAVELPAYOUTS_MARKER_ID || '681881';
const TRAVELPAYOUTS_API_TOKEN = process.env.TRAVELPAYOUTS_API_TOKEN || '';

/**
 * Generate affiliate link for flight search
 * Uses Aviasales/Jetradar affiliate program
 */
export function generateFlightAffiliateLink(params: {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers?: number;
}): string {
  const { origin, destination, departureDate, returnDate, passengers = 1 } = params;

  const baseUrl = 'https://www.aviasales.com';
  const searchParams = new URLSearchParams({
    origin_iata: origin,
    destination_iata: destination,
    departure_at: departureDate,
    ...(returnDate && { return_at: returnDate }),
    adults: passengers.toString(),
    marker: TRAVELPAYOUTS_MARKER_ID,
  });

  return `${baseUrl}/search?${searchParams.toString()}`;
}

/**
 * Generate affiliate link for hotel search
 * Uses Hotellook/Booking.com affiliate program
 */
export function generateHotelAffiliateLink(params: {
  cityName: string;
  checkIn: string;
  checkOut: string;
  guests?: number;
  rooms?: number;
}): string {
  const { cityName, checkIn, checkOut, guests = 2, rooms = 1 } = params;

  const baseUrl = 'https://search.hotellook.com';
  const searchParams = new URLSearchParams({
    city: cityName,
    checkIn: checkIn,
    checkOut: checkOut,
    adultsCount: guests.toString(),
    roomsCount: rooms.toString(),
    marker: TRAVELPAYOUTS_MARKER_ID,
  });

  return `${baseUrl}?${searchParams.toString()}`;
}

/**
 * Generate affiliate link for car rental/rides
 * Uses Economybookings affiliate program
 */
export function generateCarRentalAffiliateLink(params: {
  location: string;
  pickupDate: string;
  dropoffDate: string;
}): string {
  const { location, pickupDate, dropoffDate } = params;

  const baseUrl = 'https://www.economybookings.com';
  const searchParams = new URLSearchParams({
    location: location,
    pickup: pickupDate,
    dropoff: dropoffDate,
    marker: TRAVELPAYOUTS_MARKER_ID,
  });

  return `${baseUrl}?${searchParams.toString()}`;
}

/**
 * Generate affiliate link for nearby attractions/tours
 * Uses GetYourGuide affiliate program
 */
export function generateToursAffiliateLink(params: {
  city: string;
  country?: string;
}): string {
  const { city, country } = params;

  // GetYourGuide affiliate link format
  const baseUrl = 'https://www.getyourguide.com';
  const searchQuery = country ? `${city}-${country}` : city;

  return `${baseUrl}/s/${searchQuery}?partner_id=${TRAVELPAYOUTS_MARKER_ID}`;
}

/**
 * Generate AirHelp affiliate link for flight compensation claims
 */
export function generateAirHelpAffiliateLink(params?: {
  flightNumber?: string;
  date?: string;
}): string {
  const baseUrl = 'https://www.airhelp.com';
  const searchParams = new URLSearchParams({
    ref: TRAVELPAYOUTS_MARKER_ID,
    ...(params?.flightNumber && { flight: params.flightNumber }),
    ...(params?.date && { date: params.date }),
  });

  return `${baseUrl}?${searchParams.toString()}`;
}

/**
 * Format affiliate link with tracking parameters
 */
export function addTrackingParams(url: string, source: string = 'luno-travel-agent'): string {
  try {
    const urlObj = new URL(url);
    urlObj.searchParams.set('utm_source', source);
    urlObj.searchParams.set('utm_medium', 'affiliate');
    urlObj.searchParams.set('utm_campaign', 'luno-ai-agent');
    return urlObj.toString();
  } catch {
    return url;
  }
}

/**
 * Check if affiliate integration is properly configured
 */
export function isAffiliateConfigured(): boolean {
  return !!(TRAVELPAYOUTS_MARKER_ID && TRAVELPAYOUTS_API_TOKEN);
}

/**
 * Get Travelpayouts API token
 */
export function getApiToken(): string {
  return TRAVELPAYOUTS_API_TOKEN;
}

/**
 * Get Travelpayouts marker ID
 */
export function getMarkerId(): string {
  return TRAVELPAYOUTS_MARKER_ID;
}
