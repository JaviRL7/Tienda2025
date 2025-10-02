'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CarouselImage {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface StylizedCarouselProps {
  images: CarouselImage[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  showPlayButton?: boolean;
  className?: string;
}

export default function StylizedCarousel({
  images,
  autoPlay = true,
  autoPlayInterval = 4000,
  showControls = true,
  showIndicators = true,
  showPlayButton = true,
  className = ""
}: StylizedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isPlaying, autoPlayInterval, images.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={`relative group ${className}`}>
      {/* Contenedor principal del carousel */}
      <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-3xl shadow-2xl">
        {/* Imágenes */}
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="min-w-full h-full relative">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />

              {/* Overlay con degradado sutil */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Contenido de texto */}
              {(image.title || image.description) && (
                <div className="absolute bottom-2 sm:bottom-4 md:bottom-8 left-2 sm:left-4 md:left-8 right-2 sm:right-4 md:right-8 text-white z-10">
                  <div className="bg-black/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 max-w-2xl">
                    {image.title && (
                      <h3 className="text-sm sm:text-lg md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 leading-tight">
                        {image.title}
                      </h3>
                    )}
                    {image.description && (
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg opacity-90 leading-relaxed">
                        {image.description}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Controles de navegación */}
        {showControls && (
          <>
            <Button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-0 text-white h-12 w-12 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
              size="icon"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-0 text-white h-12 w-12 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
              size="icon"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}

        {/* Botón de play/pause */}
        {showPlayButton && (
          <Button
            onClick={togglePlay}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-0 text-white h-10 w-10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
            size="icon"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>

      {/* Indicadores */}
      {showIndicators && (
        <div className="flex justify-center space-x-3 mt-6">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-12 bg-white shadow-lg'
                  : 'w-3 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Información del slide actual */}
      <div className="flex justify-center mt-4">
        <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-white/80">
          {currentIndex + 1} de {images.length}
        </div>
      </div>
    </div>
  );
}