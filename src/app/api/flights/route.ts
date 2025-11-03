import { NextRequest, NextResponse } from 'next/server';
import { openai, model } from '@/lib/openai';
import { generateFlightAffiliateLink, generateAirHelpAffiliateLink, addTrackingParams } from '@/lib/travelpayouts';

const systemPrompt = `You are a specialized Flight Search Assistant for LUNO Travel Agent, your best trip budget bot.

IMPORTANT: When a user mentions travel from one city to another, IMMEDIATELY search and provide flight options. Don't ask for dates unless absolutely necessary - assume they want to travel soon (within next 2 weeks).

Your response format:
1. Say "Searching for flights from [origin] to [destination]..."
2. Show 3-5 flight options with:
   - Airline name and flight number
   - Departure and arrival times
   - Duration and stops (direct/1 stop/2 stops)
   - Price in ₹ (Indian Rupees) or $ (if international)
   - Mark the CHEAPEST option clearly
   - Mark the BEST VALUE option (balance of price and convenience)
3. For each flight, include "📲 Book Now" text (the link will be added automatically)
4. Be enthusiastic and helpful
5. At the end, add: "✈️ Had a flight delay or cancellation? Claim up to €600 compensation! 💰 Check Flight Compensation"`

Example response:
"✈️ Searching for flights from Chennai to Goa...

I found some great options for you!

🏆 CHEAPEST OPTION:
IndiGo 6E-782
Chennai (MAA) → Goa (GOI)
Departure: 6:30 AM | Arrival: 8:15 AM
Duration: 1h 45m (Direct)
Price: ₹3,450
📲 Book Now

💎 BEST VALUE:
Vistara UK-897
Chennai (MAA) → Goa (GOI)
Departure: 10:00 AM | Arrival: 11:50 AM
Duration: 1h 50m (Direct)
Price: ₹4,200
📲 Book Now

[Continue with 2-3 more options...]

✈️ Had a flight delay or cancellation? Claim up to €600 compensation!
💰 Check Flight Compensation"

Use realistic airline names, flight numbers, times, and prices.`;

/**
 * Extract flight route information from the AI response
 */
function extractFlightInfo(message: string): { origin: string; destination: string } | null {
  // Try to extract from "Chennai (MAA) → Goa (GOI)" format
  const routeMatch = message.match(/\(([A-Z]{3})\)\s*→\s*\(([A-Z]{3})\)/);
  if (routeMatch) {
    return { origin: routeMatch[1], destination: routeMatch[2] };
  }

  // Try to extract from "flights from Chennai to Goa" format
  const fromToMatch = message.match(/from\s+([A-Za-z\s]+?)\s+to\s+([A-Za-z\s]+?)(?:\s|\.|\?|!|$)/i);
  if (fromToMatch) {
    return { origin: fromToMatch[1].trim(), destination: fromToMatch[2].trim() };
  }

  return null;
}

/**
 * Add affiliate links to the AI response
 */
function addAffiliateLinks(message: string): string {
  let updatedMessage = message;

  // Add flight booking links
  const flightInfo = extractFlightInfo(message);
  if (flightInfo) {
    // Generate affiliate link
    const today = new Date();
    const departureDate = new Date(today);
    departureDate.setDate(today.getDate() + 7); // Default to 7 days from now

    const affiliateLink = generateFlightAffiliateLink({
      origin: flightInfo.origin,
      destination: flightInfo.destination,
      departureDate: departureDate.toISOString().split('T')[0],
      passengers: 1,
    });

    const trackedLink = addTrackingParams(affiliateLink, 'luno-flight-agent');

    // Replace "📲 Book Now" with actual affiliate link
    const linkMarkdown = `[📲 Book Now](${trackedLink})`;
    updatedMessage = updatedMessage.replace(/📲 Book Now/g, linkMarkdown);
  }

  // Add AirHelp compensation link
  const airHelpLink = generateAirHelpAffiliateLink();
  const airHelpMarkdown = `[💰 Check Flight Compensation](${airHelpLink})`;
  updatedMessage = updatedMessage.replace(/💰 Check Flight Compensation/g, airHelpMarkdown);

  return updatedMessage;
}

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json();

    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...conversationHistory,
      { role: 'user' as const, content: message },
    ];

    const completion = await openai.chat.completions.create({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 1500,
    });

    let assistantMessage = completion.choices[0]?.message?.content ||
      'Sorry, I encountered an error. Please try again.';

    // Add affiliate links to the response
    assistantMessage = addAffiliateLinks(assistantMessage);

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
