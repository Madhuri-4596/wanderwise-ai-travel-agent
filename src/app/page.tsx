import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 relative overflow-hidden">
      {/* Sakura Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 bg-clip-text text-transparent animate-gradient-x drop-shadow-lg">
            🌸 WanderWise
          </h1>
          <p className="text-3xl font-semibold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent mb-6 animate-pulse-slow">
            Wander smart, travel wise
          </p>
          <p className="text-xl text-gray-700 mb-10 leading-relaxed">
            Plan perfect trips in seconds. Get personalized itineraries, flight deals,
            and hotel recommendations powered by AI. ✨
          </p>
          <Link
            href="/chat"
            className="inline-block bg-gradient-to-r from-pink-400 to-rose-400 text-white px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:shadow-pink-400/50 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 animate-bounce-slow"
          >
            Start Planning 🌸
          </Link>
        </div>

        {/* Features Grid with Staggered Animations */}
        <div className="grid md:grid-cols-3 gap-8 mt-24 max-w-6xl mx-auto">
          <FeatureCard
            icon="✈️"
            title="Smart Itineraries"
            description="AI-powered day-by-day plans customized to your budget and preferences"
            delay="0"
          />
          <FeatureCard
            icon="💰"
            title="Best Deals"
            description="Real-time flight and hotel prices with instant booking links"
            delay="100"
          />
          <FeatureCard
            icon="🗺️"
            title="Local Insights"
            description="Discover hidden gems, local food spots, and cultural tips"
            delay="200"
          />
          <FeatureCard
            icon="🧳"
            title="Packing Lists"
            description="Smart packing recommendations based on destination and weather"
            delay="300"
          />
          <FeatureCard
            icon="🌍"
            title="Visa Assistance"
            description="Instant visa requirements and document checklists"
            delay="400"
          />
          <FeatureCard
            icon="💬"
            title="24/7 Support"
            description="Chat with AI anytime for travel advice and updates"
            delay="500"
          />
        </div>

        {/* CTA Section */}
        <div className="text-center mt-24 bg-gradient-to-r from-pink-100 via-rose-50 to-pink-100 rounded-3xl p-16 shadow-2xl animate-fade-in-up border-2 border-pink-200">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            Ready to wander wisely? 🌸
          </h2>
          <p className="text-xl text-gray-700 mb-10">
            Join thousands planning smarter trips with WanderWise ✨
          </p>
          <Link
            href="/chat"
            className="inline-block bg-gradient-to-r from-pink-400 to-rose-400 text-white px-10 py-5 rounded-full font-bold text-lg border-4 border-transparent hover:border-pink-400 hover:bg-transparent hover:text-pink-600 shadow-2xl hover:shadow-pink-400/50 transition-all duration-500 transform hover:scale-105"
          >
            Start Your Journey 🌍
          </Link>
        </div>
      </div>
    </main>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: string; title: string; description: string; delay: string }) {
  return (
    <div
      className="group bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-pink-200 hover:border-rose-400 transform hover:-translate-y-4 hover:rotate-1 animate-float"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-6xl mb-6 filter drop-shadow-lg transform group-hover:scale-125 transition-transform duration-500 animate-bounce-slow">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent group-hover:from-rose-500 group-hover:to-pink-500 transition-all duration-300">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
