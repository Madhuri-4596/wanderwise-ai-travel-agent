import GridMenu from '@/components/layouts/GridMenu';

export default function Home() {
  // Build timestamp: 2025-11-01T07:27:30Z - Force cache invalidation
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

      <div className="container mx-auto relative z-10">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16 animate-fade-in-up sunrise-animation">
          <div className="mb-6 animate-float">
            <span className="text-7xl">☀️</span>
          </div>

          <h1 className="text-7xl md:text-8xl font-black mb-4 gradient-text drop-shadow-2xl">
            Wonderlust
          </h1>

          <p className="text-2xl font-semibold text-charcoal mb-4">
            your AI bestie for dream trips 💛
          </p>

          <p className="text-lg text-charcoal-light mb-8 leading-relaxed max-w-2xl mx-auto">
            Click any box below to start planning your perfect adventure ✨
          </p>
        </div>

        {/* 6-Box Grid Menu */}
        <GridMenu />

        {/* Bottom CTA */}
        <div className="text-center mt-20 animate-fade-in-up delay-500">
          <p className="text-sm text-charcoal-light">
            Powered by AI • Built for dreamers • Made with 💛
          </p>
        </div>
      </div>
    </main>
  );
}
