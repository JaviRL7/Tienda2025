'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '@/components/layout/main-layout';
import { Camera, ChevronLeft, ChevronRight, ImageIcon, Grid, Maximize2, Instagram, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const galleryImages = [
  { src: '/galeria/g1.webp', alt: 'Creación artesanal 1', category: 'Trabajos' },
  { src: '/galeria/g2.webp', alt: 'Creación artesanal 2', category: 'Trabajos' },
  { src: '/galeria/g3.webp', alt: 'Creación artesanal 3', category: 'Trabajos' },
  { src: '/galeria/g4.webp', alt: 'Creación artesanal 4', category: 'Trabajos' },
  { src: '/galeria/g5.webp', alt: 'Creación artesanal 5', category: 'Trabajos' },
  { src: '/galeria/g6.webp', alt: 'Creación artesanal 6', category: 'Trabajos' },
  { src: '/galeria/g7.webp', alt: 'Creación artesanal 7', category: 'Trabajos' },
  { src: '/galeria/g8.webp', alt: 'Creación artesanal 8', category: 'Trabajos' },
  { src: '/galeria/g9.webp', alt: 'Taller en acción 1', category: 'Taller' },
  { src: '/galeria/g10.webp', alt: 'Taller en acción 2', category: 'Taller' },
  { src: '/galeria/g11.webp', alt: 'Momento especial 1', category: 'Momentos' },
  { src: '/galeria/g12.webp', alt: 'Momento especial 2', category: 'Momentos' }
];

export default function GaleriaPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = ['Todos', ...Array.from(new Set(galleryImages.map(img => img.category)))];
  const filteredImages = selectedCategory === 'Todos'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  const nextImage = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((selectedImageIndex + 1) % filteredImages.length);
  };

  const prevImage = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex(selectedImageIndex === 0 ? filteredImages.length - 1 : selectedImageIndex - 1);
  };

  const closeViewer = () => {
    setSelectedImageIndex(null);
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10 py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-8">
              <div className="p-6 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm">
                <Camera className="h-16 w-16 text-primary" />
              </div>
            </div>
            <h1
              className="text-5xl md:text-7xl mb-6 text-gray-800"
              style={{
                fontFamily: "'Wonderful Branding OTF', 'Wonderful Branding TTF', cursive",
              }}
            >
              Nuestra Galería
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Descubre los trabajos únicos y momentos especiales de la familia Doña Araña
            </p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border-2
                  ${selectedCategory === category
                    ? 'bg-primary text-white border-primary shadow-lg scale-105'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary hover:scale-105'
                  }
                `}
              >
                <span className="flex items-center gap-2">
                  <Grid className="h-4 w-4" />
                  {category}
                </span>
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredImages.map((image, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-2xl cursor-pointer bg-white shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100"
                onClick={() => setSelectedImageIndex(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Subtle Overlay with Dark Tint */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl" />

                {/* Hover Content */}
                <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                  <div className="text-white text-center space-y-3">
                    <div className="text-sm font-medium bg-black/30 backdrop-blur-sm rounded-lg px-3 py-1">
                      {image.alt}
                    </div>
                    <div className="text-xs bg-black/30 backdrop-blur-sm rounded-lg px-3 py-1">
                      {image.category}
                    </div>
                    <div className="p-3 rounded-full bg-white/15 backdrop-blur-md border border-white/30 group-hover:bg-white/25 transition-all duration-300 inline-flex">
                      <Maximize2 className="h-5 w-5 text-white drop-shadow-lg" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <ImageIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No hay imágenes en esta categoría</p>
            </div>
          )}
        </div>

        {/* Instagram Section */}
        <div className="py-20 bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-center mb-8">
                <div className="p-6 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400 shadow-xl">
                  <Instagram className="h-12 w-12 text-white" />
                </div>
              </div>

              <h2 className="text-4xl md:text-5xl mb-16 text-gray-800">
                <span className="font-normal">¿Quieres ver más?</span>
                <br />
                <span
                  className="block mt-8"
                  style={{
                    fontFamily: "'Wonderful Branding OTF', 'Wonderful Branding TTF', cursive",
                  }}
                >
                  ¡Síguenos!
                </span>
              </h2>

              <p className="text-2xl md:text-3xl text-gray-600 mb-16 leading-relaxed">
                Síguenos en Instagram para ver más trabajos, procesos creativos y momentos especiales de nuestro taller. Tu apoyo nos ayuda mucho y te mantendrá conectado con nuestra comunidad artesanal
              </p>

              <Button
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 text-white text-xl px-12 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => window.open('https://instagram.com/donaarana', '_blank')}
              >
                <Instagram className="h-6 w-6 mr-4" />
                Síguenos en Instagram
                <ExternalLink className="h-5 w-5 ml-3" />
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Lightbox Modal */}
        {selectedImageIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Blurred Background - Show actual page content */}
            <div className="absolute inset-0 backdrop-blur-xl bg-black/40"></div>

            <div className="relative w-full h-full flex items-center justify-center p-8">
              {/* Elegant Navigation Arrows */}
              <motion.button
                onClick={prevImage}
                className="absolute left-8 z-20 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="h-16 w-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 flex items-center justify-center transition-all duration-300 shadow-xl group-hover:border-white/40">
                  <ChevronLeft className="h-8 w-8 text-white drop-shadow-lg" />
                </div>
              </motion.button>

              <motion.button
                onClick={nextImage}
                className="absolute right-8 z-20 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="h-16 w-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 flex items-center justify-center transition-all duration-300 shadow-xl group-hover:border-white/40">
                  <ChevronRight className="h-8 w-8 text-white drop-shadow-lg" />
                </div>
              </motion.button>

              {/* Stylized Close Button */}
              <button
                onClick={closeViewer}
                className="absolute top-8 right-8 z-20 group"
              >
                <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 flex items-center justify-center transition-all duration-300 shadow-xl group-hover:scale-110 group-hover:border-white/40">
                  <span className="text-white text-xl font-light drop-shadow-lg">×</span>
                </div>
              </button>

              {/* Main Image Container */}
              <div className="relative max-w-[85vw] max-h-[75vh] flex items-center justify-center">
                {/* Image with Animation */}
                <div className="relative rounded-xl overflow-hidden shadow-xl">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={selectedImageIndex}
                      src={filteredImages[selectedImageIndex].src}
                      alt={filteredImages[selectedImageIndex].alt}
                      className="max-w-full max-h-full object-contain rounded-xl"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      transition={{
                        duration: 0.4,
                        ease: [0.25, 0.46, 0.45, 0.94] // easeOutQuart for elegant feel
                      }}
                    />
                  </AnimatePresence>
                </div>
              </div>

              {/* Image Info & Navigation Container */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-2xl px-4">
                <div className="space-y-4">
                  {/* Thumbnail Navigation */}
                  <div className="flex justify-center">
                    <div className="flex space-x-2 bg-background/90 backdrop-blur-sm rounded-full px-6 py-3 border border-border/30 shadow-lg">
                      {filteredImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            selectedImageIndex === index
                              ? 'bg-primary shadow-md scale-125'
                              : 'bg-muted-foreground/40 hover:bg-muted-foreground/70 hover:scale-110'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Image Info Panel */}
                  <div className="flex justify-center">
                    <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 rounded-2xl shadow-xl border border-border/20 overflow-hidden">
                      <div className="px-10 py-6">
                        <div className="text-center space-y-6">
                          <h3 className="text-foreground text-2xl font-semibold">
                            {filteredImages[selectedImageIndex].alt}
                          </h3>

                          <div className="flex items-center justify-center gap-8">
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 rounded-full bg-primary"></div>
                              <span className="text-muted-foreground text-base font-medium">
                                {filteredImages[selectedImageIndex].category}
                              </span>
                            </div>

                            <div className="h-6 w-px bg-border"></div>

                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 rounded-full bg-secondary"></div>
                              <span className="text-muted-foreground text-base font-medium">
                                {selectedImageIndex + 1} de {filteredImages.length}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}