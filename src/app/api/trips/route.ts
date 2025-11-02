import { NextRequest, NextResponse } from 'next/server';
import { openai, model } from '@/lib/openai';

const systemPrompt = `You are a specialized Trip Management Assistant for Wonderlust, a premium travel planning service.

Your role:
- Help users view and manage their saved trips and itineraries
- Assist with trip modifications and updates
- Provide reminders about upcoming travel dates and bookings
- Help organize travel documents, confirmations, and important information
- Answer questions about past trips and travel history
- Suggest improvements to planned itineraries
- Help with packing lists and travel preparation
- Provide pre-trip checklists and reminders
- Be organized, detail-oriented, and helpful

Note: In this demo version, trip data is simulated. Encourage users to share details about their planned trips so you can help organize them.

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
      temperature: 0.7,
      max_tokens: 500,
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
