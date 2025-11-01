# 🌍 WanderWise

> Wander smart, travel wise - Your AI-powered trip planner

Built with Next.js, OpenAI, and Travel APIs

Turn travel dreams into reality with AI-generated itineraries, real-time flight/hotel prices, and personalized recommendations. **Perfect for your portfolio AND scalable into a real startup.**

![Tech Stack](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-412991?logo=openai)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)

---

## ✨ Features

- 🤖 **AI Chat Interface** - Natural conversation for trip planning
- ✈️ **Real-Time Flight Data** - Integration-ready for Amadeus/Skyscanner APIs
- 🏨 **Hotel Recommendations** - Smart accommodation suggestions with pricing
- 📅 **Auto-Generated Itineraries** - Day-by-day plans with activities, meals, and costs
- 🧳 **Smart Packing Lists** - Destination-specific recommendations
- 🌍 **Visa Assistance** - Requirements and document checklists
- 💰 **Budget Optimization** - Plans that fit your budget
- 🔗 **Shareable Trips** - Beautiful itinerary pages
- 📱 **Responsive Design** - Works perfectly on mobile and desktop

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))
- (Optional) Amadeus API credentials for live flight/hotel data

### Installation

```bash
# Clone or navigate to the project
cd wanderwise

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Add your OpenAI API key to .env.local
# OPENAI_API_KEY=sk-your-key-here

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start planning trips!

---

## 📁 Project Structure

```
wanderwise/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── planTrip/       # OpenAI trip planning endpoint
│   │   │   ├── flights/        # Flight search API
│   │   │   ├── hotels/         # Hotel search API
│   │   │   └── auth/           # Authentication routes
│   │   ├── chat/               # Chat interface page
│   │   ├── trip/[id]/          # Trip itinerary viewer
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Landing page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── ChatInterface.tsx   # Main chat UI
│   │   └── TripItinerary.tsx   # Trip display component
│   ├── lib/
│   │   └── auth.ts             # Auth utilities
│   └── types/
│       └── index.ts            # TypeScript definitions
├── .env.example                # Environment variables template
├── package.json
└── README.md
```

---

## 🔑 API Setup Guide

### 1. OpenAI (Required)

```bash
# Get your API key from https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-your-key-here
```

**Cost Optimization:**
- Currently uses `gpt-4o-mini` (~$0.15 per 1M input tokens)
- Upgrade to `gpt-4o` for better quality (~$2.50 per 1M input tokens)
- Average trip planning costs ~$0.01-0.03 per conversation

### 2. Amadeus Travel API (Optional - for real data)

```bash
# Sign up at https://developers.amadeus.com/
# Free tier: 10,000 API calls/month

AMADEUS_CLIENT_ID=your-client-id
AMADEUS_CLIENT_SECRET=your-client-secret
```

**Integration Steps:**
1. Install SDK: `npm install amadeus`
2. Update `/src/app/api/flights/route.ts` with Amadeus client
3. Replace mock data with real API calls

**Alternative:** Use Skyscanner RapidAPI (easier but limited free tier)

### 3. Authentication (Choose One)

#### Option A: Supabase (Recommended)
```bash
npm install @supabase/supabase-js @supabase/auth-ui-react

NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

#### Option B: Firebase
```bash
npm install firebase

NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
```

#### Option C: NextAuth.js
```bash
npm install next-auth
# Configure in /app/api/auth/[...nextauth]/route.ts
```

---

## 💸 Monetization Strategies

### 1. Affiliate Commissions (Primary Revenue)

**Flight & Hotel Bookings:**
- Skyscanner: ~5% commission per booking
- Booking.com: 25-40% commission
- Expedia: 3-8% commission
- Trip.com: 5-10% commission

**Tours & Experiences:**
- GetYourGuide: 8-12% per booking
- Viator: 8% per booking

**Implementation:**
```javascript
// Add affiliate IDs to booking links
const bookingLink = `https://www.booking.com/searchresults.html?aid=${AFFILIATE_ID}&...`;
```

### 2. Freemium Model

**Free Tier:**
- 3 trip plans per month
- Basic itineraries
- Standard destinations

**Pro Tier ($9.99/month):**
- Unlimited trip planning
- Advanced AI features (GPT-4)
- Real-time price alerts
- Priority support
- Shareable custom itineraries

**Premium Tier ($29.99/month):**
- Everything in Pro
- Concierge support during travel
- Group trip planning
- White-label for travel agents

### 3. B2B Licensing

**Sell to travel agencies:**
- $99-499/month per agency
- White-label your AI planner
- Custom branding
- API access

### 4. Sponsored Destinations

**Partner with tourism boards:**
- Feature specific destinations
- $500-2000 per campaign
- Native advertising in recommendations

### 5. Data Insights (Ethical)

**Anonymized trend data:**
- Where people want to travel
- Budget preferences
- Activity interests
- Sell to tourism companies

---

## 📊 Revenue Projections (Example)

### Month 1-3 (Launch Phase)
- **Users:** 1,000 monthly active
- **Affiliate conversions:** 2% (20 bookings)
- **Avg commission:** $25 per booking
- **Monthly revenue:** ~$500

### Month 6 (Growth Phase)
- **Users:** 10,000 monthly active
- **Affiliate conversions:** 3% (300 bookings)
- **Premium subscribers:** 100 users @ $9.99
- **Monthly revenue:** ~$8,500
  - Affiliate: $7,500
  - Subscriptions: $1,000

### Month 12 (Scale Phase)
- **Users:** 50,000 monthly active
- **Affiliate conversions:** 4% (2,000 bookings)
- **Premium subscribers:** 1,000 @ $9.99
- **B2B clients:** 5 agencies @ $199
- **Monthly revenue:** ~$60,000+
  - Affiliate: $50,000
  - Subscriptions: $10,000
  - B2B: $1,000

---

## 🚀 Deployment

### Deploy to Vercel (Recommended - Free)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

**Why Vercel:**
- Free hobby tier
- Perfect for Next.js
- Auto-scaling
- Built-in analytics
- Custom domains

### Alternative Platforms

**Netlify:**
```bash
npm run build
netlify deploy --prod
```

**Railway / Render:**
- Better for databases
- Slightly higher costs
- More control

---

## 🛠️ Development Roadmap

### Week 1-2: MVP ✅
- [x] Chat interface
- [x] OpenAI integration
- [x] Basic itinerary generation
- [x] Mock flight/hotel data

### Week 3-4: Data Integration
- [ ] Amadeus API integration
- [ ] Real flight prices
- [ ] Real hotel availability
- [ ] User authentication

### Week 5-6: Polish
- [ ] Save trips to database
- [ ] Share functionality
- [ ] PDF export
- [ ] Mobile optimization

### Week 7-8: Monetization
- [ ] Affiliate link integration
- [ ] Premium subscription
- [ ] Payment processing (Stripe)
- [ ] Analytics dashboard

### Future Features
- [ ] Multi-language support
- [ ] Currency conversion
- [ ] Travel insurance integration
- [ ] Group trip planning
- [ ] Real-time travel alerts
- [ ] Mobile app (React Native)

---

## 🎯 Marketing & Growth

### Launch Strategy

1. **Product Hunt Launch**
   - Prepare demo video
   - Create compelling story
   - Aim for Product of the Day

2. **Social Media**
   - TikTok: Trip planning demos
   - Instagram: Beautiful itineraries
   - Twitter: Travel tips + AI insights

3. **Content Marketing**
   - Blog: "How AI Plans Better Trips"
   - YouTube: Tutorial videos
   - Reddit: Share in r/travel, r/solotravel

4. **SEO**
   - Target keywords: "AI trip planner", "travel itinerary generator"
   - Create destination guides
   - Build backlinks

5. **Partnerships**
   - Collaborate with travel bloggers
   - Affiliate with influencers
   - Partner with tourism boards

---

## 🧪 Testing

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Run production build locally
npm start

# Lint code
npm run lint
```

**Test Scenarios:**
1. Plan a 5-day trip to Bali under $1500
2. Weekend romantic getaway in Paris
3. Family vacation to Tokyo with kids
4. Budget backpacking through Thailand

---

## 🤝 Contributing

Want to make this better? Here's how:

1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Submit a pull request

**Priority Features:**
- Real API integrations
- Better itinerary formatting
- Multi-language support
- Mobile app

---

## 📄 License

MIT License - feel free to use this for your portfolio or startup!

---

## 💡 Pro Tips

### Cost Optimization
- Use `gpt-4o-mini` for most queries (95% cheaper than GPT-4)
- Cache common destinations
- Implement rate limiting
- Use Vercel free tier

### User Experience
- Keep initial responses under 3 seconds
- Add loading animations
- Show example prompts
- Enable retry on errors

### Growth Hacks
- Referral program (20% commission)
- Viral trip sharing
- Instagram-worthy itinerary images
- "Built with AI" badge

### Security
- Never expose API keys client-side
- Implement rate limiting
- Validate all user inputs
- Use HTTPS everywhere

---

## 🆘 Troubleshooting

**OpenAI API errors:**
- Check your API key is valid
- Verify you have credits
- Check rate limits

**Styling not working:**
- Run `npm install` again
- Delete `.next` folder and rebuild
- Check Tailwind config

**Build errors:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Update Next.js: `npm install next@latest`

---

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/yourusername/wanderwise/issues)
- **Discussions:** [GitHub Discussions](https://github.com/yourusername/wanderwise/discussions)
- **Email:** your@email.com

---

## 🌟 Show Your Support

If this helped you build something cool, give it a ⭐ on GitHub!

**Built with love by [Your Name]**

---

*Ready to disrupt the $800B travel industry with AI? Let's go! 🚀*
