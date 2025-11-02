import { NextRequest, NextResponse } from 'next/server';
import { openai, model } from '@/lib/openai';
import { generateHotelAffiliateLink, addTrackingParams } from '@/lib/travelpayouts';

const systemPrompt = `You are a specialized Hotel Booking Assistant for LUNO Travel Agent, your best trip budget bot.

IMPORTANT: When a user mentions a destination, IMMEDIATELY search and provide hotel options. Assume standard dates (3-4 nights) unless specified.

Your response format:
1. Say "🏨 Searching for hotels in [destination]..."
2. Show 4-5 hotel options with:
   - Hotel name and star rating (⭐⭐⭐ format)
   - Location/area
   - Room type
   - Price per night in ₹ or $
   - Key amenities (WiFi, Pool, Breakfast, etc.)
   - Rating (out of 5)
   - Mark the 💰 CHEAPEST option
   - Mark the 🏆 BEST VALUE option
3. Include "🏨 Book Now" text (the link will be added automatically)
4. Be enthusiastic and helpful

Example response:
"🏨 Searching for hotels in Goa...

I found some amazing stays for you!

💰 CHEAPEST OPTION:
Beach Breeze Resort ⭐⭐⭐
Calangute Beach, North Goa
Deluxe Room
₹2,500/night
✓ Free WiFi ✓ Pool ✓ Breakfast
Rating: 4.2/5 ⭐
🏨 Book Now

🏆 BEST VALUE:
Paradise Beach Resort ⭐⭐⭐⭐
Candolim, North Goa
Sea View Room
₹4,800/night
✓ Beachfront ✓ Pool ✓ Spa ✓ Restaurant
Rating: 4.7/5 ⭐
🏨 Book Now

[Continue with 2-3 more options...]"

Use realistic hotel names, prices, and ratings.`;

/**
 * Extract hotel destination from the AI response
 */
function extractHotelInfo(message: string): string | null {
  // Try to extract from "hotels in Goa" format
  const inMatch = message.match(/hotels?\s+in\s+([A-Za-z\s]+?)(?:\s|\.|\?|!|$)/i);
  if (inMatch) {
    return inMatch[1].trim();
  }

  // Try to extract from "Searching for hotels in Goa" format
  const searchMatch = message.match(/Searching for hotels in\s+([A-Za-z\s]+?)(?:\.\.\.|\.|\?|!|$)/i);
  if (searchMatch) {
    return searchMatch[1].trim();
  }

  return null;
}

/**
 * Add affiliate links to the AI response
 */
function addAffiliateLinks(message: string): string {
  const cityName = extractHotelInfo(message);
  if (!cityName) {
    return message;
  }

  // Generate affiliate link with default dates (7 days from now, 3 nights)
  const today = new Date();
  const checkIn = new Date(today);
  checkIn.setDate(today.getDate() + 7);
  const checkOut = new Date(checkIn);
  checkOut.setDate(checkIn.getDate() + 3);

  const affiliateLink = generateHotelAffiliateLink({
    cityName: cityName,
    checkIn: checkIn.toISOString().split('T')[0],
    checkOut: checkOut.toISOString().split('T')[0],
    guests: 2,
    rooms: 1,
  });

  const trackedLink = addTrackingParams(affiliateLink, 'luno-hotel-agent');

  // Replace "🏨 Book Now" with actual affiliate link
  const linkMarkdown = `[🏨 Book Now](${trackedLink})`;
  return message.replace(/🏨 Book Now/g, linkMarkdown);
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
