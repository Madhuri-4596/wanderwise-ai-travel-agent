import ChatBox from '@/components/layouts/ChatBox';

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden py-8">
      {/* Golden Sparkle Dust Particles */}
      <div className="sun-particle">✨</div>
      <div className="sun-particle">✨</div>
      <div className="sun-particle">✨</div>
      <div className="sun-particle">✨</div>
      <div className="sun-particle">✨</div>
      <div className="sun-particle">✨</div>

      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-butter/30 to-glow/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-br from-glow/20 to-butter/30 rounded-full blur-3xl animate-blob-reverse"></div>
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-gradient-to-br from-cream/40 to-butter/20 rounded-full blur-3xl animate-blob delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-8 animate-fade-in-up sunrise-animation">
          <div className="mb-3 animate-float">
            <span className="text-5xl">☀️</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black mb-3 gradient-text drop-shadow-2xl">
            Wonderlust
          </h1>

          <p className="text-xl font-semibold text-charcoal mb-2">
            your AI bestie for dream trips 💛
          </p>

          <p className="text-sm text-charcoal-light mb-6">
            Chat with 6 AI travel agents simultaneously ✨
          </p>
        </div>

        {/* 2x3 Grid of Chat Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <ChatBox
            title="Flights"
            icon="✈️"
            agentType="flights"
            description="Find and book the best flight deals for your trip."
          />
          <ChatBox
            title="Hotels"
            icon="🏨"
            agentType="hotels"
            description="Discover cozy stays that match your vibe."
          />
          <ChatBox
            title="Rides"
            icon="🚗"
            agentType="rides"
            description="Get car and bike rentals for your adventure."
          />
          <ChatBox
            title="Nearby Spots"
            icon="📍"
            agentType="nearby"
            description="Explore cafes, views, and secret places."
          />
          <ChatBox
            title="AI Travel Agent"
            icon="💬"
            agentType="ai-agent"
            description="Your personal travel planning assistant."
          />
          <ChatBox
            title="My Trips"
            icon="🎒"
            agentType="my-trips"
            description="Manage your saved plans and itineraries."
          />
        </div>

        {/* Bottom CTA */}
        <div className="text-center py-6 animate-fade-in-up delay-500">
          <p className="text-xs text-charcoal-light">
            Powered by AI • Built for dreamers • Made with 💛
          </p>
        </div>
      </div>
    </main>
  );
}
