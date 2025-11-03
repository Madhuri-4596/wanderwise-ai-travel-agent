/**
 * Travelpayouts Affiliate Integration
 * Utilities for generating affiliate links for flights, hotels, and transportation
 */

const TRAVELPAYOUTS_MARKER_ID = process.env.TRAVELPAYOUTS_MARKER_ID || '681881';
const TRAVELPAYOUTS_API_TOKEN = process.env.TRAVELPAYOUTS_API_TOKEN || '';

/**
 * Generate affiliate link for flight search
 * Uses Travelpayouts redirect system for better tracking
 */
export function generateFlightAffiliateLink(params: {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers?: number;
}): string {
  const { origin, destination, departureDate, returnDate, passengers = 1 } = params;

  // Use Travelpayouts redirect link for proper tracking
  // Format: https://tp.media/r?marker=XXXXX&p=XXXXX&u=search_url
  const searchUrl = `https://www.aviasales.com/search/${origin}${departureDate}${destination}${returnDate || departureDate}${passengers}`;

  const redirectParams = new URLSearchParams({
    marker: TRAVELPAYOUTS_MARKER_ID,
    trs: TRAVELPAYOUTS_MARKER_ID,
    p: 'luno_flights',
    u: searchUrl,
  });

  return `https://tp.media/r?${redirectParams.toString()}`;
}

/**
 * Generate affiliate link for hotel search
 * Uses Travelpayouts redirect for Hotellook/Booking.com
 */
export function generateHotelAffiliateLink(params: {
  cityName: string;
  checkIn: string;
  checkOut: string;
  guests?: number;
  rooms?: number;
}): string {
  const { cityName, checkIn, checkOut, guests = 2, rooms = 1 } = params;

  // Use Hotellook widget redirect URL for better compatibility
  const searchUrl = `https://www.hotellook.com/hotels/${cityName.toLowerCase().replace(/\s+/g, '-')}?checkIn=${checkIn}&checkOut=${checkOut}&adultsCount=${guests}&marker=${TRAVELPAYOUTS_MARKER_ID}`;

  const redirectParams = new URLSearchParams({
    marker: TRAVELPAYOUTS_MARKER_ID,
    trs: TRAVELPAYOUTS_MARKER_ID,
    p: 'luno_hotels',
    u: searchUrl,
  });

  return `https://tp.media/r?${redirectParams.toString()}`;
}

/**
 * Generate affiliate link for car rental/rides
 * Uses Travelpayouts redirect for Economybookings
 */
export function generateCarRentalAffiliateLink(params: {
  location: string;
  pickupDate: string;
  dropoffDate: string;
}): string {
  const { location, pickupDate, dropoffDate } = params;

  // Use Economybookings search URL
  const searchUrl = `https://www.economybookings.com/search?location=${encodeURIComponent(location)}&pickup_date=${pickupDate}&dropoff_date=${dropoffDate}&marker=${TRAVELPAYOUTS_MARKER_ID}`;

  const redirectParams = new URLSearchParams({
    marker: TRAVELPAYOUTS_MARKER_ID,
    trs: TRAVELPAYOUTS_MARKER_ID,
    p: 'luno_rides',
    u: searchUrl,
  });

  return `https://tp.media/r?${redirectParams.toString()}`;
}

/**
 * Generate affiliate link for nearby attractions/tours
 * Uses Klook via Travelpayouts
 */
export function generateToursAffiliateLink(params: {
  city: string;
  country?: string;
}): string {
  // Use Klook Travelpayouts short link
  // This link is pre-configured with your affiliate ID
  return 'https://klook.tpo.lu/jenOkdvH';
}

/**
 * Generate AirHelp affiliate link for flight compensation claims
 * Uses AirHelp via Travelpayouts
 */
export function generateAirHelpAffiliateLink(params?: {
  flightNumber?: string;
  date?: string;
}): string {
  // Use AirHelp Travelpayouts short link
  // This link is pre-configured with your affiliate ID
  return 'https://airhelp.tpo.lu/EkozISKL';
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
