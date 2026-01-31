'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function SlideCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { url: '/uploads/profil/bike_home.jpg', title: 'Photo 1' },
    { url: '/uploads/profil/bike_trip.jpg', title: 'Photo 2' },
    { url: '/uploads/profil/coche.jpg', title: 'Photo 3' },
    { url: '/uploads/profil/escalade.jpg', title: 'Photo 4' },
  ];

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative max-w-4xl mx-auto overflow-hidden rounded-lg">
      {/* Container des slides */}
      <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div key={index} className="min-w-full h-96 relative">
            <Image
              src={image.url}
              alt={image.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* Titre optionnel sur l'image */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <h3 className="text-white text-xl font-semibold">{image.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Boutons de navigation */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 text-gray-800 p-3 rounded-full hover:bg-white shadow-lg transition"
      >
        ←
      </button>

      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 text-gray-800 p-3 rounded-full hover:bg-white shadow-lg transition"
      >
        →
      </button>

      {/* Indicateurs */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-8' : 'bg-white/50 w-2'
            }`}
          />
        ))}
      </div>
    </div>
  );
}