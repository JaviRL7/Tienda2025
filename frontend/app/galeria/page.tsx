'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '@/components/layout/main-layout';
import { Camera, ChevronLeft, ChevronRight, ImageIcon, Grid, Maximize2, Instagram, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { galeriaApi, type GaleriaImagen, type GaleriaTag } from '@/lib/api';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function GaleriaPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [images, setImages] = useState<GaleriaImagen[]>([]);
  const [etiquetas, setEtiquetas] = useState<GaleriaTag[]>([]);
  const [loading, setLoading] = useState(true);

  const filteredImages = selectedCategory === 'Todos'
    ? images
    : images.filter(img => img.etiquetas.some(etiqueta => etiqueta.nombreCapitalizado === selectedCategory));

  useEffect(() => {
    loadGalleryData();
  }, []);

  const loadGalleryData = async () => {
    try {
      const [imagesResponse, etiquetasResponse] = await Promise.all([
        galeriaApi.getAll(),
        galeriaApi.getEtiquetas()
      ]);
      setImages(imagesResponse.data);
      setEtiquetas(etiquetasResponse.data);
    } catch (error) {
      console.error('Error loading gallery data:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Todos', ...etiquetas.filter(e => e.totalUsos && e.totalUsos > 0).map(e => e.nombreCapitalizado || e.nombre)];

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
        <motion.div
          className="bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10 py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto px-4 text-center">
            <motion.div
              className="flex justify-center mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <div className="p-6 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm">
                <Camera className="h-16 w-16 text-primary" />
              </div>
            </motion.div>
            <motion.h1
              className="text-5xl md:text-7xl mb-6 text-gray-800"
              style={{
                fontFamily: "'Wonderful Branding OTF', 'Wonderful Branding TTF', cursive",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            >
              Nuestra Galería
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            >
              Descubre los trabajos únicos y momentos especiales de la familia Doña Araña
            </motion.p>
          </div>
        </motion.div>

        {/* Filter Buttons */}
        <div className="container mx-auto px-4 py-12">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <LoadingSpinner className="h-8 w-8" />
            </div>
          ) : (
            <>
              <motion.div
                className="flex flex-wrap justify-center gap-4 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {categories.map((category, categoryIndex) => {
                  const etiqueta = etiquetas.find(e => e.nombreCapitalizado === category || e.nombre === category);
                  const count = category === 'Todos'
                    ? images.length
                    : images.filter(img => img.etiquetas.some(e => e.nombreCapitalizado === category || e.nombre === category)).length;

                  return (
                    <motion.button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`
                        px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border-2 relative
                        ${selectedCategory === category
                          ? 'bg-primary text-white border-primary shadow-lg'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary'
                        }
                      `}
                      style={{
                        borderColor: selectedCategory === category && etiqueta?.color ? etiqueta.color : undefined,
                        backgroundColor: selectedCategory === category && etiqueta?.color ? etiqueta.color : undefined
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.5 + (categoryIndex * 0.1),
                        ease: "easeOut"
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="flex items-center gap-2">
                        <Grid className="h-4 w-4" />
                        {category}
                        <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-black/10">
                          {count}
                        </span>
                      </span>
                    </motion.button>
                  );
                })}
              </motion.div>

              {/* Gallery Grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    className="group relative overflow-hidden rounded-2xl cursor-pointer bg-white shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100"
                    onClick={() => setSelectedImageIndex(index)}
                    initial={{ opacity: 0, y: 60, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.6 + (index * 0.1),
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    whileHover={{
                      scale: 1.03,
                      y: -8,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${image.ruta}`}
                        alt={image.nombre}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src = '/images/placeholder.jpg';
                        }}
                      />
                    </div>

                    {/* Subtle Overlay with Dark Tint */}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl" />

                    {/* Hover Content */}
                    <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                      <div className="text-white text-center space-y-3">
                        <div className="text-sm font-medium bg-black/30 backdrop-blur-sm rounded-lg px-3 py-1">
                          {image.nombre}
                        </div>
                        {image.etiquetas.length > 0 && (
                          <div className="flex flex-wrap gap-1 justify-center">
                            {image.etiquetas.slice(0, 2).map((etiqueta) => (
                              <div
                                key={etiqueta.id}
                                className="text-xs bg-black/30 backdrop-blur-sm rounded-lg px-2 py-1"
                                style={{ backgroundColor: etiqueta.color + '80' }}
                              >
                                {etiqueta.nombreCapitalizado}
                              </div>
                            ))}
                            {image.etiquetas.length > 2 && (
                              <div className="text-xs bg-black/30 backdrop-blur-sm rounded-lg px-2 py-1">
                                +{image.etiquetas.length - 2}
                              </div>
                            )}
                          </div>
                        )}
                        <div className="p-3 rounded-full bg-white/15 backdrop-blur-md border border-white/30 group-hover:bg-white/25 transition-all duration-300 inline-flex">
                          <Maximize2 className="h-5 w-5 text-white drop-shadow-lg" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}

          {filteredImages.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <ImageIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              </motion.div>
              <motion.p
                className="text-gray-500 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.7 }}
              >
                No hay imágenes en esta categoría
              </motion.p>
            </motion.div>
          )}
        </div>

        {/* Instagram Section */}
        <motion.div
          className="py-20 bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <motion.div
                className="flex justify-center mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="p-6 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400 shadow-xl">
                  <Instagram className="h-12 w-12 text-white" />
                </div>
              </motion.div>

              <motion.h2
                className="text-4xl md:text-5xl mb-16 text-gray-800"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                viewport={{ once: true, margin: "-100px" }}
              >
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
              </motion.h2>

              <motion.p
                className="text-2xl md:text-3xl text-gray-600 mb-16 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                Síguenos en Instagram para ver más trabajos, procesos creativos y momentos especiales de nuestro taller. Tu apoyo nos ayuda mucho y te mantendrá conectado con nuestra comunidad.
              </motion.p>

              <motion.a
                href="https://www.instagram.com/dona_arana_sanlucar/?hl=es"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 text-white text-xl px-12 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Instagram className="h-6 w-6 mr-4" />
                  Síguenos en Instagram
                  <ExternalLink className="h-5 w-5 ml-3" />
                </Button>
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Lightbox Modal */}
        <AnimatePresence>
          {selectedImageIndex !== null && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Blurred Background - Show actual page content */}
              <motion.div
                className="absolute inset-0 backdrop-blur-xl bg-black/40"
                initial={{ backdropFilter: "blur(0px)" }}
                animate={{ backdropFilter: "blur(20px)" }}
                exit={{ backdropFilter: "blur(0px)" }}
                transition={{ duration: 0.4 }}
              ></motion.div>

            <div className="relative w-full h-full flex items-center justify-center p-8">
              {/* Elegant Navigation Arrows */}
              <motion.button
                onClick={prevImage}
                className="absolute left-8 z-20 group"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="h-16 w-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 flex items-center justify-center transition-all duration-300 shadow-xl group-hover:border-white/40">
                  <ChevronLeft className="h-8 w-8 text-white drop-shadow-lg" />
                </div>
              </motion.button>

              <motion.button
                onClick={nextImage}
                className="absolute right-8 z-20 group"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="h-16 w-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 flex items-center justify-center transition-all duration-300 shadow-xl group-hover:border-white/40">
                  <ChevronRight className="h-8 w-8 text-white drop-shadow-lg" />
                </div>
              </motion.button>

              {/* Stylized Close Button */}
              <motion.button
                onClick={closeViewer}
                className="absolute top-8 right-8 z-20 group"
                initial={{ opacity: 0, scale: 0.8, rotate: 90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 flex items-center justify-center transition-all duration-300 shadow-xl group-hover:scale-110 group-hover:border-white/40">
                  <span className="text-white text-xl font-light drop-shadow-lg">×</span>
                </div>
              </motion.button>

              {/* Main Image Container */}
              <div className="relative max-w-[85vw] max-h-[75vh] flex items-center justify-center">
                {/* Image with Animation */}
                <div className="relative rounded-xl overflow-hidden shadow-xl">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={selectedImageIndex}
                      src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${filteredImages[selectedImageIndex].ruta}`}
                      alt={filteredImages[selectedImageIndex].nombre}
                      className="max-w-full max-h-full object-contain rounded-xl"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      transition={{
                        duration: 0.4,
                        ease: [0.25, 0.46, 0.45, 0.94] // easeOutQuart for elegant feel
                      }}
                      onError={(e) => {
                        e.currentTarget.src = '/images/placeholder.jpg';
                      }}
                    />
                  </AnimatePresence>
                </div>
              </div>

              {/* Image Info & Navigation Container */}
              <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-2xl px-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
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
                            {filteredImages[selectedImageIndex].nombre}
                          </h3>

                          {filteredImages[selectedImageIndex].descripcion && (
                            <p className="text-muted-foreground text-base">
                              {filteredImages[selectedImageIndex].descripcion}
                            </p>
                          )}

                          <div className="flex items-center justify-center gap-8 flex-wrap">
                            {filteredImages[selectedImageIndex].etiquetas.length > 0 && (
                              <div className="flex items-center gap-3">
                                <div className="flex flex-wrap gap-2">
                                  {filteredImages[selectedImageIndex].etiquetas.map((etiqueta) => (
                                    <span
                                      key={etiqueta.id}
                                      className="text-sm px-3 py-1 rounded-full text-white font-medium"
                                      style={{ backgroundColor: etiqueta.color }}
                                    >
                                      {etiqueta.nombreCapitalizado}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="h-6 w-px bg-border"></div>

                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 rounded-full bg-secondary"></div>
                              <span className="text-muted-foreground text-base font-medium">
                                {selectedImageIndex + 1} de {filteredImages.length}
                              </span>
                            </div>

                            {filteredImages[selectedImageIndex].dimensiones && (
                              <>
                                <div className="h-6 w-px bg-border"></div>
                                <div className="flex items-center gap-3">
                                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                                  <span className="text-muted-foreground text-base font-medium">
                                    {filteredImages[selectedImageIndex].dimensiones}
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
}