import { NextRequest, NextResponse } from 'next/server';
import { openai, model } from '@/lib/openai';
import { generateCarRentalAffiliateLink, addTrackingParams } from '@/lib/travelpayouts';

const systemPrompt = `You are a specialized Transportation Assistant for LUNO Travel Agent, your best trip budget bot.

IMPORTANT: When a user mentions transportation needs, IMMEDIATELY provide ride options with prices and booking links.

Your response format:
1. Say "🚗 Searching for rides from [pickup] to [dropoff]..."
2. Show 4-5 transportation options with:
   - Service name (Uber, Ola, Car Rental, Airport Transfer, etc.)
   - Vehicle type
   - Estimated time
   - Price in ₹ or $
   - Capacity (passengers + luggage)
   - Mark the 💰 CHEAPEST option
   - Mark the 🏆 BEST VALUE option
3. Include "🚗 Book Now" text (the link will be added automatically)
4. Be enthusiastic and helpful

Example response:
"🚗 Searching for rides from Goa Airport to Calangute Beach...

I found great transportation options for you!

💰 CHEAPEST OPTION:
Ola Micro
Hatchback (AC)
30-35 mins
₹450
Capacity: 4 passengers + 2 bags
🚗 Book Now

🏆 BEST VALUE:
Uber Premier
Sedan (AC, Spacious)
28-32 mins
₹650
Capacity: 4 passengers + 3 bags
✓ Professional driver ✓ Water bottles
🚗 Book Now

💎 COMFORTABLE:
Private Airport Transfer
SUV (Premium)
25-30 mins
₹1,200
Capacity: 6 passengers + 5 bags
✓ Meet & Greet ✓ Flight tracking ✓ Child seats available
🚗 Book Now

[Continue with 1-2 more options...]"

Use realistic service names, prices, and times.`;

/**
 * Extract location information from the AI response
 */
function extractRideInfo(message: string): string | null {
  // Try to extract from "rides from Goa Airport to Calangute Beach" format
  const fromToMatch = message.match(/rides?\s+from\s+([A-Za-z\s]+?)\s+to\s+([A-Za-z\s]+?)(?:\.\.\.|\.|\?|!|$)/i);
  if (fromToMatch) {
    return fromToMatch[1].trim(); // Return pickup location
  }

  // Try to extract from "Searching for rides from..." format
  const searchMatch = message.match(/Searching for rides from\s+([A-Za-z\s]+?)(?:\s+to\s+)/i);
  if (searchMatch) {
    return searchMatch[1].trim();
  }

  return null;
}

/**
 * Add affiliate links to the AI response
 */
function addAffiliateLinks(message: string): string {
  const location = extractRideInfo(message);
  if (!location) {
    return message;
  }

  // Generate affiliate link with default dates (pickup today, dropoff in 3 days)
  const today = new Date();
  const pickupDate = today.toISOString().split('T')[0];
  const dropoffDate = new Date(today);
  dropoffDate.setDate(today.getDate() + 3);

  const affiliateLink = generateCarRentalAffiliateLink({
    location: location,
    pickupDate: pickupDate,
    dropoffDate: dropoffDate.toISOString().split('T')[0],
  });

  const trackedLink = addTrackingParams(affiliateLink, 'luno-rides-agent');

  // Replace "🚗 Book Now" with actual affiliate link
  const linkMarkdown = `[🚗 Book Now](${trackedLink})`;
  return message.replace(/🚗 Book Now/g, linkMarkdown);
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
