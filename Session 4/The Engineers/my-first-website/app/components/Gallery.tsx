export default function Gallery() {
  const images = [
    { src: '/images/photo 1.jpg', caption: 'Cheer Practice' },
    { src: '/images/photo 2.jpg', caption: 'Team Spirit' },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-purple-800">Photo Gallery 📸</h2>
        <p className="text-center text-gray-600 mb-8">Snapshots from practice and performances!</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {images.map((image, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 border-4 border-pink-300"
            >
              <img 
                src={image.src} 
                alt={image.caption} 
                className="w-full h-72 md:h-80 object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent flex items-end p-6">
                <span className="text-white font-bold text-xl">{image.caption}</span>
              </div>
              <div className="absolute top-4 right-4 bg-yellow-400 text-purple-900 font-bold px-3 py-1 rounded-full text-sm">
                🎀 Live Photo
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-500 mt-6 text-sm">
          💡 Add more photos to <code className="bg-gray-100 px-2 py-1 rounded">public/images/</code> to see them here!
        </p>
      </div>
    </section>
  );
}
