import Link from 'next/link';
import FloatingWindow from '@/components/common/FloatingWindow';

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Golden Sparkle Dust Particles */}
      <div className="sun-particle">✨</div>
      <div className="sun-particle">✨</div>
      <div className="sun-particle">✨</div>
      <div className="sun-particle">✨</div>
      <div className="sun-particle">✨</div>
      <div className="sun-particle">✨</div>

      {/* Animated Background Blobs - Butter tones */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-butter/30 to-glow/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-br from-glow/20 to-butter/30 rounded-full blur-3xl animate-blob-reverse"></div>
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-gradient-to-br from-cream/40 to-butter/20 rounded-full blur-3xl animate-blob delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto animate-fade-in-up sunrise-animation">
          <div className="mb-8 animate-float">
            <span className="text-8xl">☀️</span>
          </div>

          <h1 className="text-8xl md:text-9xl font-black mb-6 gradient-text drop-shadow-2xl">
            Wonderlust
          </h1>

          <p className="text-3xl font-bold text-charcoal mb-6">
            your AI bestie for dream trips 💛
          </p>

          <p className="text-lg text-charcoal-light mb-10 leading-relaxed max-w-2xl mx-auto">
            Planning trips has never been this magical. Get personalized itineraries,
            flight deals, and hotel recommendations from an AI that actually gets you. ✨
          </p>

          <Link
            href="/chat"
            className="inline-block btn-butter px-12 py-6 rounded-full text-xl transform hover:scale-105 transition-all duration-300"
          >
            Start Wandering ☀️
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-32 max-w-6xl mx-auto">
          <FeatureCard
            icon="🧭"
            title="Smart Itineraries"
            description="AI-powered plans that match your vibe, budget, and secret travel fantasies"
            delay={0}
          />
          <FeatureCard
            icon="💛"
            title="Best Deals"
            description="Real-time flight & hotel prices that won't make your wallet cry"
            delay={100}
          />
          <FeatureCard
            icon="🗺️"
            title="Local Secrets"
            description="Hidden gems, local food spots, and insider tips only locals know"
            delay={200}
          />
          <FeatureCard
            icon="🎒"
            title="Packing Assistant"
            description="Smart recommendations based on destination weather & your style"
            delay={300}
          />
          <FeatureCard
            icon="🌍"
            title="Visa Helper"
            description="Instant visa requirements & document checklists for stress-free travel"
            delay={400}
          />
          <FeatureCard
            icon="💬"
            title="24/7 AI Bestie"
            description="Chat anytime for travel advice, updates, and spontaneous trip ideas"
            delay={500}
          />
        </div>

        {/* CTA Section */}
        <div className="text-center mt-32 glass-strong rounded-[3rem] p-16 shadow-warm animate-fade-in-up max-w-4xl mx-auto">
          <div className="mb-6 animate-bounce-soft">
            <span className="text-6xl">☀️</span>
          </div>
          <h2 className="text-5xl font-black mb-6 gradient-text">
            Ready to escape reality?
          </h2>
          <p className="text-lg text-charcoal-light mb-10">
            Join thousands planning smarter, dreamier trips with Wonderlust ✨
          </p>
          <Link
            href="/chat"
            className="inline-block btn-butter px-10 py-5 rounded-full text-lg transform hover:scale-105 transition-all duration-300"
          >
            Start Your Journey 💛
          </Link>
        </div>
      </div>

      {/* Floating Window Component */}
      <FloatingWindow />
    </main>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: string; title: string; description: string; delay: number }) {
  return (
    <div
      className="group glass-strong p-8 rounded-3xl shadow-warm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 animate-float hover-glow"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-6xl mb-6 transform group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 animate-bounce-soft">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3 text-charcoal group-hover:scale-105 transition-all duration-300">
        {title}
      </h3>
      <p className="text-charcoal-light leading-relaxed">
        {description}
      </p>
    </div>
  );
}
