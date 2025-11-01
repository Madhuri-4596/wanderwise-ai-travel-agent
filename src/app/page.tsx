import Link from 'next/link';

const features = [
  { id: 'flights', icon: '✈️', title: 'Flights', desc: 'Find and book flights', gradient: 'from-indigo-600 to-purple-600' },
  { id: 'hotels', icon: '🏨', title: 'Hotels', desc: 'Discover cozy stays', gradient: 'from-violet-600 to-fuchsia-600' },
  { id: 'rides', icon: '🚗', title: 'Rides', desc: 'Car & bike rentals', gradient: 'from-emerald-600 to-teal-600' },
  { id: 'nearby', icon: '📍', title: 'Nearby Spots', desc: 'Cafes, views, secret places', gradient: 'from-orange-600 to-red-600' },
  { id: 'ai-agent', icon: '🤖', title: 'AI Travel Agent', desc: 'Chat to plan trips', gradient: 'from-pink-600 to-rose-600' },
  { id: 'my-trips', icon: '🧳', title: 'My Trips', desc: 'Saved plans & itineraries', gradient: 'from-cyan-600 to-blue-600' },
];

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 py-16">
      <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl w-[800px] p-10 border border-slate-700/50">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
            Wonderlust
          </h1>
          <p className="text-slate-400 text-sm">Multi-Agent AI Travel Assistant</p>
        </div>

        <p className="text-slate-300 mb-10 text-center leading-relaxed">
          Your AI bestie for dream trips ✨<br />
          <span className="text-slate-400 text-sm">Choose your travel assistant to get started</span>
        </p>

        {/* Grid Section - 3 columns, 2 rows */}
        <div className="grid grid-cols-3 gap-5">
          {features.map((item, index) => (
            <Link
              key={item.id}
              href={`/chat/${item.id}`}
              className="group relative bg-gradient-to-br from-slate-700/50 to-slate-800/50 hover:from-slate-700/80 hover:to-slate-800/80 rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1 border border-slate-600/30 hover:border-slate-500/50 overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              {/* Icon in gradient box */}
              <div className={`bg-gradient-to-br ${item.gradient} text-white text-3xl p-4 rounded-xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>

              {/* Title */}
              <h2 className="font-bold text-white mb-1 text-center">
                {item.title}
              </h2>

              {/* Description */}
              <p className="text-slate-400 text-xs text-center leading-tight">
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
