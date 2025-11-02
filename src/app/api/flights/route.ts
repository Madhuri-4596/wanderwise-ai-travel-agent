import { NextRequest, NextResponse } from 'next/server';
import { openai, model } from '@/lib/openai';

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
3. For each flight, provide a booking link like: https://www.skyscanner.com/transport/flights/[origin]/[destination]/
4. Be enthusiastic and helpful

Example response:
"✈️ Searching for flights from Chennai to Goa...

I found some great options for you!

🏆 CHEAPEST OPTION:
IndiGo 6E-782
Chennai (MAA) → Goa (GOI)
Departure: 6:30 AM | Arrival: 8:15 AM
Duration: 1h 45m (Direct)
Price: ₹3,450
Book now: https://www.skyscanner.com/transport/flights/maa/goi/

💎 BEST VALUE:
Vistara UK-897
Chennai (MAA) → Goa (GOI)
Departure: 10:00 AM | Arrival: 11:50 AM
Duration: 1h 50m (Direct)
Price: ₹4,200
Book now: https://www.skyscanner.com/transport/flights/maa/goi/

[Continue with 2-3 more options...]"

Use realistic airline names, flight numbers, times, and prices. Always provide Skyscanner booking links.`;

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
