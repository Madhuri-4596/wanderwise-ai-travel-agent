import { NextRequest, NextResponse } from 'next/server';
import { openai, model } from '@/lib/openai';

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
3. Provide booking links like: https://www.booking.com/searchresults.html?ss=[city-name]
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
Book: https://www.booking.com/searchresults.html?ss=Goa

🏆 BEST VALUE:
Paradise Beach Resort ⭐⭐⭐⭐
Candolim, North Goa
Sea View Room
₹4,800/night
✓ Beachfront ✓ Pool ✓ Spa ✓ Restaurant
Rating: 4.7/5 ⭐
Book: https://www.booking.com/searchresults.html?ss=Goa

[Continue with 2-3 more options...]"

Use realistic hotel names, prices, and ratings. Always provide booking links.`;

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

    const assistantMessage = completion.choices[0]?.message?.content ||
      'Sorry, I encountered an error. Please try again.';

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
