# 🚀 Quick Start Guide

Get your WanderWise running in 5 minutes!

## Step 1: Get Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)

## Step 2: Add API Key to Project

Open `.env.local` and add your key:

```bash
OPENAI_API_KEY=sk-your-actual-key-here
```

## Step 3: Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

## Step 4: Test It Out

Try these example prompts in the chat:

- "Plan a 5-day trip to Bali under $1500"
- "Romantic weekend in Paris for couples"
- "Family vacation to Tokyo with 2 kids"
- "Budget backpacking through Thailand"

## What You Get Out of the Box

✅ Beautiful landing page at `/`
✅ AI chat interface at `/chat`
✅ Sample trip itinerary at `/trip/1`
✅ OpenAI-powered trip planning
✅ Mock flight and hotel data (integrate real APIs later)

## Next Steps

### Make it Production-Ready

1. **Add Real Travel Data**
   - Sign up for [Amadeus API](https://developers.amadeus.com/) (free tier)
   - Update `/src/app/api/flights/route.ts` and `/src/app/api/hotels/route.ts`

2. **Add User Authentication**
   - Choose: Supabase, Firebase, or NextAuth.js
   - Follow instructions in `/src/lib/auth.ts`

3. **Deploy to Vercel**
   ```bash
   npm i -g vercel
   vercel
   ```

4. **Start Monetizing**
   - Add affiliate links (see README.md)
   - Set up payment processing for premium features
   - Track conversions with analytics

## Troubleshooting

**"Module not found" errors?**
```bash
rm -rf node_modules .next
npm install
npm run dev
```

**OpenAI errors?**
- Make sure your API key is in `.env.local`
- Check you have credits at platform.openai.com
- Restart the dev server after adding the key

**Styling looks broken?**
```bash
npm install tailwindcss postcss autoprefixer
npm run dev
```

## Project Structure Quick Reference

```
src/
├── app/
│   ├── page.tsx           # Landing page
│   ├── chat/              # AI chat interface
│   ├── trip/[id]/         # Trip viewer
│   └── api/
│       ├── planTrip/      # OpenAI endpoint
│       ├── flights/       # Flight search
│       └── hotels/        # Hotel search
└── components/
    ├── ChatInterface.tsx  # Chat UI
    └── TripItinerary.tsx  # Trip display
```

## Need Help?

- 📖 Full docs: See `README.md`
- 🐛 Issues: Create a GitHub issue
- 💬 Questions: Check the README troubleshooting section

---

**Ready to disrupt travel? Let's go! 🌍✈️**
