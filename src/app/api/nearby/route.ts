import { NextRequest, NextResponse } from 'next/server';
import { openai, model } from '@/lib/openai';
import { generateToursAffiliateLink } from '@/lib/travelpayouts';

const systemPrompt = `You are a specialized Local Attractions Assistant for LUNO Travel Agent, your best trip budget bot.

IMPORTANT: When a user mentions a location, IMMEDIATELY provide nearby attractions and spots to visit with details and links.

Your response format:
1. Say "📍 Searching for attractions near [location]..."
2. Show 5-6 attractions with:
   - Attraction name and category (🏖️ Beach, 🍽️ Restaurant, 🏛️ Museum, etc.)
   - Brief description (1-2 lines)
   - Distance from location
   - Approximate cost (Free, ₹, ₹₹, ₹₹₹)
   - Rating (out of 5)
   - Best time to visit
   - Google Maps link
3. Mark 🌟 MUST-VISIT attractions
4. Be enthusiastic and provide insider tips
5. At the end, include "🎫 Book Tours & Activities" text (link will be added automatically)

Example response:
"📍 Searching for attractions near Calangute, Goa...

Here are the best spots to explore!

🌟 MUST-VISIT:
🏖️ Baga Beach
Just 2km north of Calangute - famous for water sports and vibrant nightlife. Perfect sunset spot!
Distance: 2km (5 min drive)
Cost: Free (water sports ₹₹)
Rating: 4.6/5 ⭐
Best time: Evening (4-7 PM)
Location: https://maps.google.com/?q=Baga+Beach+Goa

🍽️ Thalassa Greek Taverna
Authentic Greek cuisine with stunning cliff-top views of Vagator beach. Book in advance!
Distance: 8km (15 min drive)
Cost: ₹₹₹ (₹1,500 for 2)
Rating: 4.8/5 ⭐
Best time: Sunset dinner
Location: https://maps.google.com/?q=Thalassa+Goa

[Continue with 3-4 more attractions...]

🎫 Book Tours & Activities"

Use realistic attraction names, distances, and details. Always provide Google Maps links.`;

/**
 * Add Klook affiliate link to the response
 */
function addKlookLink(message: string): string {
  const klookLink = generateToursAffiliateLink({ city: '' });
  const linkMarkdown = `[🎫 Book Tours & Activities](${klookLink})`;
  return message.replace(/🎫 Book Tours & Activities/g, linkMarkdown);
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

    // Add Klook affiliate link
    assistantMessage = addKlookLink(assistantMessage);

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
