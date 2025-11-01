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
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-yellow-50 to-yellow-100 py-16">
      <div className="bg-white rounded-2xl shadow-md w-[750px] p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Wonderlust</h1>
        </div>

        <p className="text-gray-600 mb-8 text-center">
          Your AI bestie for dream trips 💛<br />
          Choose your travel assistant to get started ✨
        </p>

        {/* Grid Section - 3 columns, 2 rows */}
        <div className="grid grid-cols-3 gap-6">
          {features.map((item) => (
            <Link
              key={item.id}
              href={`/chat/${item.id}`}
              className="bg-gray-100 hover:bg-gray-200 rounded-xl py-8 flex flex-col items-center justify-center shadow-sm cursor-pointer transition-transform duration-200 hover:scale-105"
            >
              <div className="bg-[#4b2e2b] text-white text-2xl p-3 rounded-lg mb-3">
                {item.icon}
              </div>
              <h2 className="font-semibold text-gray-800">{item.title}</h2>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-8">
          Powered by AI • Built for dreamers • Made with 💛
        </p>
      </div>
    </main>
  );
}
