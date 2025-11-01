import Link from 'next/link';

const features = [
  { id: 'flights', icon: '✈️', title: 'Flights', desc: 'Find and book flights' },
  { id: 'hotels', icon: '🏨', title: 'Hotels', desc: 'Discover cozy stays' },
  { id: 'rides', icon: '🚗', title: 'Rides', desc: 'Car & bike rentals' },
  { id: 'nearby', icon: '📍', title: 'Nearby Spots', desc: 'Cafes, views, secret places' },
  { id: 'ai-agent', icon: '🤖', title: 'AI Travel Agent', desc: 'Chat to plan trips' },
  { id: 'my-trips', icon: '🧳', title: 'My Trips', desc: 'Saved plans & itineraries' },
];

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 px-4">
      <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-5xl p-8 md:p-12 border border-slate-700/50">
        {/* Header */}
        <div className="mb-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mb-2">
            Wonderlust
          </h1>
          <p className="text-slate-400 text-sm">Multi-Agent AI Travel Assistant</p>
        </div>

        <p className="text-slate-300 mb-10 text-center leading-relaxed">
          Your AI bestie for dream trips ✨<br />
          <span className="text-slate-400 text-sm">Choose your travel assistant to get started</span>
        </p>

        {/* Services Grid - CSS Grid with 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((item) => (
            <Link
              key={item.id}
              href={`/chat/${item.id}`}
              className="group relative bg-gradient-to-br from-slate-700/40 to-slate-800/40 rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ease-out border-2 border-transparent hover:border-purple-500/50 hover:-translate-y-3 hover:shadow-[0_15px_40px_rgba(168,85,247,0.4)] overflow-hidden"
            >
              {/* Shine effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>

              {/* Icon Box - 80x80px with dark gradient */}
              <div className="service-icon w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-slate-900 to-slate-700 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-purple-500/30 transition-shadow duration-300">
                <span className="text-4xl">{item.icon}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-slate-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-slate-500 mt-10">
          Powered by AI • Built for dreamers • Made with 💜
        </p>
      </div>

    </main>
  );
}
