import { NextRequest, NextResponse } from 'next/server';
import { openai, model } from '@/lib/openai';

const systemPrompt = `You are the General AI Travel Agent for Wonderlust, a premium travel planning service.

Your role:
- Be a comprehensive travel planning assistant covering all aspects of travel
- Help users plan entire trips from start to finish
- Coordinate flights, hotels, transportation, activities, and dining
- Ask clarifying questions about: destinations, dates, budget, travel style, interests, group size
- Provide personalized recommendations based on user preferences
- Create custom itineraries and travel schedules
- Offer travel tips, visa information, weather insights, and cultural advice
- Help with trip modifications and adjustments
- Be creative, enthusiastic, and inspire wanderlust
- Handle complex multi-destination trips

You are the most versatile agent and can handle any travel-related request. When specialized needs arise, you can guide users to our specialized agents (flights, hotels, rides, nearby attractions, or trip management).

Always maintain a warm, sunset-inspired tone that matches the Wonderlust brand.`;

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
      temperature: 0.8,
      max_tokens: 600,
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
