import IconGrid from '@/components/layouts/IconGrid';

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden py-16">
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

      <div className="container mx-auto relative z-10 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in-up sunrise-animation">
          <div className="mb-4 animate-float">
            <span className="text-6xl">☀️</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-black mb-3 gradient-text drop-shadow-2xl">
            Wonderlust
          </h1>

          <p className="text-xl font-semibold text-charcoal mb-2">
            your AI bestie for dream trips 💛
          </p>

          <p className="text-base text-charcoal-light leading-relaxed">
            Choose your travel assistant to get started ✨
          </p>
        </div>

        {/* 2x3 Icon Grid */}
        <IconGrid />

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in-up delay-500">
          <p className="text-sm text-charcoal-light">
            Powered by AI • Built for dreamers • Made with 💛
          </p>
        </div>
      </div>
    </main>
  );
}
