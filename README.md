# LUNO Travel Agent - Your Best Trip Budget Bot

Smart AI-powered travel assistant helping you find the best flights, hotels, and rides at budget-friendly prices. Built with Next.js, OpenAI, and NextAuth.

## Features

- **6 Specialized AI Agents:**
  - ✈️ Flights - Search and book flights
  - 🏨 Hotels - Find perfect accommodations
  - 🚗 Rides - Book transportation
  - 📍 Nearby Spots - Discover local attractions
  - 💬 AI Travel Agent - General travel planning
  - 🎒 My Trips - View and manage itineraries

- **Authentication System:**
  - Secure login with NextAuth.js
  - Protected routes with middleware
  - Session management with JWT
  - Beautiful video background on login page

- **Video Backgrounds:**
  - Dynamic video backgrounds on login page
  - Video backgrounds in all 6 multi-agent chat windows
  - Optimized overlays for text readability

- **Vibrant UI Design:**
  - Orange/red gradient theme
  - Bold typography for better readability
  - Smooth animations and glassmorphism effects
  - Responsive chat windows with minimize/maximize controls

- **Modular Component Architecture:**
  - Reusable `ChatTextarea` for message input
  - `MessageBubble` for chat messages
  - `IconGrid` for the 6 feature boxes
  - `ChatWindow` that slides up from bottom
  - `FloatingWindow` for quick AI access

## Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key
- (Optional) Razorpay account for payment integration

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file from the example:
```bash
cp .env.example .env
```

3. Configure environment variables in `.env`:
```bash
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4-turbo-preview

# NextAuth Configuration
NEXTAUTH_SECRET=generate_using_openssl_rand_base64_32
NEXTAUTH_URL=http://localhost:3000

# Razorpay (Optional - for payments)
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
```

To generate a secure `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

4. Add your travel video background:
   - Place a video file named `travel-bg.mp4` in the `public/videos/` directory
   - See `public/videos/README.md` for video requirements and sources
   - Free videos available at: Pexels, Pixabay, or Unsplash

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

### Default Login Credentials

For demo purposes, use these credentials:
- **Email**: demo@luno.com
- **Password**: password123

**Important**: In production, replace the in-memory user store in `src/lib/auth.ts` with a proper database.

## Project Structure

```
src/
├── app/
│   ├── api/              # API routes for each agent
│   │   ├── auth/
│   │   │   └── [...nextauth]/  # NextAuth authentication
│   │   ├── payment/      # Razorpay payment integration
│   │   ├── flights/
│   │   ├── hotels/
│   │   ├── rides/
│   │   ├── nearby/
│   │   ├── ai-agent/
│   │   └── trips/
│   ├── login/
│   │   └── page.tsx      # Login page with video background
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout with SessionProvider
│   └── page.tsx          # Main page with IconGrid
├── components/
│   ├── common/           # Reusable components
│   │   ├── ChatTextarea.tsx
│   │   └── MessageBubble.tsx  # With Razorpay integration
│   └── layouts/          # Layout components
│       ├── IconGrid.tsx  # 6 agent features
│       ├── ChatWindow.tsx  # With video background
│       └── FloatingWindow.tsx
├── hooks/
│   └── useRazorpay.ts    # Payment hook
├── lib/
│   ├── auth.ts           # NextAuth configuration
│   └── openai.ts         # OpenAI client
├── types/
│   └── index.ts          # TypeScript type definitions
├── middleware.ts         # Route protection
└── ...
```

## How It Works

1. **Authentication Flow:**
   - Users are redirected to the login page with video background
   - Login with demo credentials or custom users
   - JWT-based session management
   - Protected routes via middleware

2. **Home Page:** Displays 6 rounded feature boxes in a 2×3 grid with LUNO branding

3. **Click a Box:** Opens a sliding chat window with video background

4. **Chat Interface:**
   - Each agent has its own specialized API endpoint
   - Conversation history maintained throughout session
   - Real-time AI responses from OpenAI
   - Video background with overlay for readability

5. **Payment Integration:**
   - "Book Now & Pay" button appears for booking results
   - Integrated Razorpay checkout
   - Automatic price extraction from AI responses

6. **Window Controls:**
   - Minimize/maximize chat windows
   - Close button to return to home
   - Full-screen mode available

## Next Steps

### Production Deployment

1. **Database Integration:**
   - Replace in-memory user store with a database (PostgreSQL, MongoDB, etc.)
   - Add user registration functionality
   - Store user sessions and trip history

2. **Video Background:**
   - Add your travel video to `public/videos/travel-bg.mp4`
   - Optimize video file size for web performance

3. **Environment Variables:**
   - Set up all required environment variables in your hosting platform
   - Generate and add a secure `NEXTAUTH_SECRET`
   - Add production `NEXTAUTH_URL`

4. **Affiliate Programs:**
   - Sign up for TravelPayouts, Booking.com, or similar
   - Replace booking links with your affiliate links
   - Update agent prompts with your affiliate IDs

5. **Payment Integration:**
   - Create a Razorpay account
   - Add test and live API keys
   - Configure webhook endpoints for payment verification

6. **Security:**
   - Enable CORS restrictions
   - Add rate limiting
   - Implement proper error handling and logging

## Customization

- **Colors:** Edit `tailwind.config.ts` to change the sunset theme
- **Agents:** Modify `src/components/layouts/IconGrid.tsx` to add/remove features
- **Animations:** Update `src/app/globals.css` for different effects

## License

MIT
