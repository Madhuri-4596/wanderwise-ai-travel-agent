/**
 * Travelpayouts Affiliate Integration
 * Utilities for generating affiliate links for flights, hotels, and transportation
 */

const TRAVELPAYOUTS_MARKER_ID = process.env.TRAVELPAYOUTS_MARKER_ID || '681881';
const TRAVELPAYOUTS_API_TOKEN = process.env.TRAVELPAYOUTS_API_TOKEN || '';

/**
 * Generate affiliate link for flight search
 * Uses Aviasales with direct affiliate tracking
 */
export function generateFlightAffiliateLink(params: {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers?: number;
}): string {
  const { origin, destination, departureDate, returnDate, passengers = 1 } = params;

  // Format dates for Aviasales (DDMMYY format)
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}${month}${year}`;
  };

  const formattedDeparture = formatDate(departureDate);
  const formattedReturn = returnDate ? formatDate(returnDate) : formattedDeparture;

  // Aviasales direct search URL format with marker
  return `https://www.aviasales.com/search/${origin}${formattedDeparture}${destination}${formattedReturn}${passengers}?marker=${TRAVELPAYOUTS_MARKER_ID}`;
}

/**
 * Generate affiliate link for hotel search
 * Uses Klook via Travelpayouts for hotel bookings
 */
export function generateHotelAffiliateLink(params: {
  cityName: string;
  checkIn: string;
  checkOut: string;
  guests?: number;
  rooms?: number;
}): string {
  // Use Klook Travelpayouts redirect link for hotels
  // Klook covers hotels, accommodations, and stays
  return 'https://tp.media/r?marker=681881&trs=470821&p=4110&u=https%3A%2F%2Fklook.com&campaign_id=137';
}

/**
 * Generate affiliate link for car rental/rides
 * Uses Klook via Travelpayouts for transportation and transfers
 */
export function generateCarRentalAffiliateLink(params: {
  location: string;
  pickupDate: string;
  dropoffDate: string;
}): string {
  // Use Klook Travelpayouts redirect link for transportation
  // Klook covers airport transfers, car rentals, and transportation
  return 'https://tp.media/r?marker=681881&trs=470821&p=4110&u=https%3A%2F%2Fklook.com&campaign_id=137';
}

/**
 * Generate affiliate link for nearby attractions/tours
 * Uses Klook via Travelpayouts for activities and attractions
 */
export function generateToursAffiliateLink(params: {
  city: string;
  country?: string;
}): string {
  // Use Klook Travelpayouts redirect link for tours and activities
  // Klook covers attractions, tours, activities, and experiences
  return 'https://tp.media/r?marker=681881&trs=470821&p=4110&u=https%3A%2F%2Fklook.com&campaign_id=137';
}

/**
 * Generate AirHelp affiliate link for flight compensation claims
 * Uses AirHelp via Travelpayouts with proper redirect tracking
 */
export function generateAirHelpAffiliateLink(params?: {
  flightNumber?: string;
  date?: string;
}): string {
  // Use AirHelp Travelpayouts redirect link with campaign tracking
  return 'https://tp.media/r?marker=681881&trs=470821&p=4197&u=https%3A%2F%2Fairhelp.com&campaign_id=120';
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
