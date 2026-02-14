export default function Gallery() {
  const images = [
    '/images/placeholder-1.svg',
    '/images/placeholder-2.svg',
    '/images/placeholder-3.svg',
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-purple-800">Gallery 📸</h2>
        <p className="text-center text-gray-600 mb-8">Snapshots from practice and performances.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((src, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-56 object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-25 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white font-semibold">Photo {i + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
