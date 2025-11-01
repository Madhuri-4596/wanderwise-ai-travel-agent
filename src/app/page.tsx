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

      <div className="container mx-auto relative z-10 flex items-center justify-center min-h-[calc(100vh-8rem)]">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-[800px] p-8 animate-slide-up">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-semibold text-gray-800 mb-1">Wonderlust</h1>
              <p className="text-sm text-gray-500">Multi-Agent AI Travel Assistant</p>
            </div>
          </div>

          <p className="text-gray-600 mb-8 text-center leading-relaxed">
            Your AI bestie for dream trips 💛<br />
            Choose your travel assistant to get started ✨
          </p>

          {/* 2x3 Icon Grid */}
          <IconGrid />

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Powered by AI • Built for dreamers • Made with 💛
          </p>
        </div>
      </div>
    </main>
  );
}
