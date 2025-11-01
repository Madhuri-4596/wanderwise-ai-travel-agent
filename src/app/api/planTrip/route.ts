import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ChatRequest } from '@/types';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { message, conversationHistory = [] } = body;

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          message: "OpenAI API key is not configured. Please add your OPENAI_API_KEY to the .env.local file.",
          error: "API key missing"
        },
        { status: 500 }
      );
    }

    // Build conversation messages for OpenAI
    const messages: any[] = [
      {
        role: 'system',
        content: `You are an expert AI travel agent. Your role is to help users plan amazing trips.

KEY RESPONSIBILITIES:
- Ask clarifying questions about budget, duration, travel dates, number of travelers, and preferences
- Suggest destinations based on user interests and constraints
- Create detailed day-by-day itineraries with specific activities, timings, and locations
- Recommend flights and hotels (mention that you'll fetch real prices)
- Provide packing lists, visa requirements, and travel tips
- Consider budget constraints and optimize for value
- Be friendly, enthusiastic, and helpful

RESPONSE FORMAT:
- For initial queries, ask clarifying questions
- Once you have enough info, provide:
  1. Trip overview (destination, duration, budget breakdown)
  2. Day-by-day itinerary with morning/afternoon/evening activities
  3. Accommodation suggestions
  4. Flight recommendations (mention checking live prices)
  5. Packing essentials
  6. Pro tips and local insights

Keep responses conversational but structured. Use emojis sparingly for visual appeal.`,
      },
      ...conversationHistory.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: 'user',
        content: message,
      },
    ];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Using cost-effective model; upgrade to gpt-4o for better quality
      messages: messages,
      temperature: 0.8,
      max_tokens: 1500,
    });

    const aiResponse = completion.choices[0]?.message?.content ||
      "I'm having trouble planning right now. Could you try rephrasing your request?";

    return NextResponse.json({
      message: aiResponse,
      suggestions: [], // Can add quick reply suggestions here
    });

  } catch (error: any) {
    console.error('OpenAI API Error:', error);

    let errorMessage = "I encountered an error while planning your trip. Please try again.";

    if (error.code === 'insufficient_quota') {
      errorMessage = "The OpenAI API quota has been exceeded. Please check your billing settings.";
    } else if (error.code === 'invalid_api_key') {
      errorMessage = "Invalid OpenAI API key. Please check your configuration.";
    }

    return NextResponse.json(
      {
        message: errorMessage,
        error: error.message
      },
      { status: 500 }
    );
  }
}
