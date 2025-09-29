'use client';

import { MapPin, Phone, Instagram, Package, Heart, ShoppingBag, BookOpen, ExternalLink, Clock, MessageSquare, User, Calendar, PenTool, Edit3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/main-layout';
import { useAuthStore } from '@/store/auth';
import { useAuthModal } from '@/store/auth-modal-context';
import { resenasApi, type Resena, type ResenaRequest } from '@/lib/api';
import toast from 'react-hot-toast';

function InfoHeader() {
  return (
    <div className="my-20 text-center">
      <motion.h1
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-800"
        style={{
          fontFamily: "'Wonderful Branding OTF', 'Wonderful Branding TTF', cursive",
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Nuestra Información
      </motion.h1>
      <motion.p
        className="text-gray-600 text-xl max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Todo lo que necesitas saber sobre nuestra tienda artesanal de lanas y materiales creativos
      </motion.p>
    </div>
  );
}

function NuestraHistoriaSection() {
  return (
    <div className="mt-48 mb-32">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            src="/Cambios/Nuevafoto1.webp"
            alt="Interior de la tienda Doña Araña"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </motion.div>

        <div className="flex flex-col justify-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-8"
            style={{
              fontFamily: "'Wonderful Branding OTF', 'Wonderful Branding TTF', cursive",
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Nuestra Historia
          </motion.h2>
          <motion.div
            className="space-y-6 text-gray-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-xl leading-relaxed">
              Doña Araña nació del amor por las manualidades y la tradición artesanal de Sanlúcar de Barrameda.
              Desde hace años, nos dedicamos a ofrecer los mejores materiales para que puedas dar vida a tus proyectos creativos.
            </p>
            <p className="text-xl leading-relaxed">
              En nuestra tienda encontrarás una cuidadosa selección de lanas, hilos y materiales de la más alta calidad.
              Nos enorgullece ser parte de cada proyecto especial que nuestros clientes crean con nuestros productos.
            </p>
            <p className="text-xl leading-relaxed">
              Ven a visitarnos y déjate inspirar por nuestro mundo de colores y texturas.
              Te ayudaremos a encontrar exactamente lo que necesitas para tu próxima creación.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ServiciosYProductosSection() {
  return (
    <div className="grid lg:grid-cols-2 gap-20 items-start">
      {/* Qué Ofrecemos - Expandido */}
      <div>
        <div className="mb-12">
          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="p-4 rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-lg">
              <ShoppingBag className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-800">
              Qué Ofrecemos
            </h2>
          </motion.div>
          <motion.p
            className="text-xl text-gray-600 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Descubre nuestra cuidadosa selección de productos y servicios diseñados para inspirar tu creatividad
          </motion.p>
        </div>

        <div className="space-y-32">
          <motion.div
            className="flex items-start gap-4 p-4 bg-white/70 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <ShoppingBag className="h-8 w-8 text-primary" />
            </motion.div>
            <div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Productos Katia</h3>
              <p className="text-gray-600">Lanas y materiales de la mejor calidad de la marca Katia, cuidadosamente seleccionados</p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-start gap-4 p-4 bg-white/70 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Heart className="h-8 w-8 text-primary" />
            </motion.div>
            <div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Atención Personalizada</h3>
              <p className="text-gray-600">Asesoramiento experto y atención individualizada para cada uno de tus proyectos</p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-start gap-4 p-4 bg-white/70 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <BookOpen className="h-8 w-8 text-primary" />
            </motion.div>
            <div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Revistas y Material Didáctico y Accesorios</h3>
              <p className="text-gray-600">Todo lo necesario para aprender y desarrollar tus habilidades creativas</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Horarios */}
      <div>
        <div className="mb-12">
          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="p-4 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-800">
              Horarios de Apertura
            </h2>
          </motion.div>
          <motion.p
            className="text-xl text-gray-600 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Ven a visitarnos en nuestros horarios de atención
          </motion.p>
        </div>

        <motion.div
          className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 border border-emerald-100 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid gap-4">
            {[
              { day: 'Lunes', hours: '10:00 - 13:30', isOpen: true, note: 'Solo mañanas' },
              { day: 'Martes', hours: '10:00 - 13:30 • 18:00 - 21:00', isOpen: true },
              { day: 'Miércoles', hours: '10:00 - 13:30 • 18:00 - 21:00', isOpen: true },
              { day: 'Jueves', hours: '10:00 - 13:30 • 18:00 - 21:00', isOpen: true },
              { day: 'Viernes', hours: '10:00 - 13:30 • 18:00 - 21:00', isOpen: true },
              { day: 'Sábado', hours: '10:00 - 14:00', isOpen: true, note: 'Solo mañanas' },
              { day: 'Domingo', hours: 'Cerrado', isOpen: false }
            ].map((schedule, index) => (
              <motion.div
                key={schedule.day}
                className={`flex items-center justify-between p-6 rounded-2xl transition-all duration-300 ${
                  schedule.isOpen
                    ? 'bg-white/80 border border-emerald-200 shadow-sm hover:shadow-md'
                    : 'bg-red-50/80 border border-red-200'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    className={`w-4 h-4 rounded-full ${schedule.isOpen ? 'bg-emerald-500' : 'bg-red-500'}`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                    viewport={{ once: true }}
                  ></motion.div>
                  <div>
                    <span className="font-bold text-xl text-gray-800">{schedule.day}</span>
                    {schedule.note && (
                      <span className="ml-3 text-sm bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                        {schedule.note}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className={`font-semibold text-lg ${schedule.isOpen ? 'text-gray-700' : 'text-red-600'}`}>
                    {schedule.hours}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function InstagramSection() {
  return (
    <motion.div
      className="max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="flex justify-center mb-8"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="p-6 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400 shadow-xl">
          <Instagram className="h-12 w-12 text-white" />
        </div>
      </motion.div>

      <motion.h2
        className="text-4xl md:text-5xl mb-16 text-gray-800 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <span className="font-normal">¿Quieres ver más?</span>
        <br />
        <span
          className="block mt-8"
          style={{ fontFamily: "'Wonderful Branding OTF', 'Wonderful Branding TTF', cursive" }}
        >
          ¡Síguenos!
        </span>
      </motion.h2>

      <motion.p
        className="text-2xl md:text-3xl text-gray-600 mb-16 leading-relaxed text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
      >
        Síguenos en Instagram para ver más trabajos, procesos creativos y momentos especiales de nuestro taller.
        Tu apoyo nos ayuda mucho y te mantendrá conectado con nuestra comunidad artesanal
      </motion.p>

      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <a
          href="https://www.instagram.com/dona_arana_sanlucar/?hl=es"
          target="_blank"
          rel="noopener noreferrer"
        >
          <motion.button
            className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 text-white text-xl px-12 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Instagram className="h-6 w-6 mr-4" />
            Síguenos en Instagram
            <ExternalLink className="h-5 w-5 ml-3" />
          </motion.button>
        </a>
      </motion.div>
    </motion.div>
  );
}

function SistemaApartadosSection() {
  return (
    <motion.div
      className="bg-white/60 backdrop-blur-sm rounded-3xl p-10 border border-gray-100"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-gray-800 mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Sistema de apartados - Prototipo Publicitario
      </motion.h2>
      <div className="flex flex-col md:flex-row justify-around items-start md:items-center gap-8">
        <motion.div
          className="flex-1 text-center group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="mx-auto mb-6 w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Heart className="h-12 w-12 text-primary" />
          </motion.div>
          <div className="w-12 h-1 bg-primary/30 mx-auto mb-4 rounded-full"></div>
          <h3 className="font-bold text-xl text-gray-800 mb-3">1. Explora el catálogo</h3>
          <p className="text-gray-600 text-base">Navega por nuestros productos para conocer nuestra variedad (solo muestra)</p>
        </motion.div>

        <motion.div
          className="flex-1 text-center group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="mx-auto mb-6 w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Package className="h-12 w-12 text-green-600" />
          </motion.div>
          <div className="w-12 h-1 bg-primary/30 mx-auto mb-4 rounded-full"></div>
          <h3 className="font-bold text-xl text-gray-800 mb-3">2. Contáctanos por Instagram</h3>
          <p className="text-gray-600 text-base">Escríbenos @dona_arana_sanlucar mencionando el producto que te interesa</p>
        </motion.div>

        <motion.div
          className="flex-1 text-center group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="mx-auto mb-6 w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Instagram className="h-12 w-12 text-primary" />
          </motion.div>
          <div className="w-12 h-1 bg-primary/30 mx-auto mb-4 rounded-full"></div>
          <h3 className="font-bold text-xl text-gray-800 mb-3">3. Reserva y compra</h3>
          <p className="text-gray-600 text-base">Te informaremos disponibilidad y coordinaremos la recogida en tienda</p>
        </motion.div>
      </div>

      <motion.div
        className="mt-10 p-6 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <p className="text-base text-orange-800 text-center">
          <strong>⚠️ Aviso Importante:</strong> Esta página web es un prototipo publicitario para portfolio. Para reservar cualquier producto, contáctanos directamente por Instagram @dona_arana_sanlucar ya que faltan la mayoría de productos del catálogo completo.
        </p>
      </motion.div>
    </motion.div>
  );
}

function DondeEstamosSection() {
  return (
    <motion.div
      className="bg-white/60 backdrop-blur-sm rounded-3xl p-10 border border-gray-100"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-gray-800 mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Dónde estamos
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          className="relative h-96 rounded-3xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            src="/conocenos/PRADILLO.jpg"
            alt="El Pradillo - Referencia de ubicación"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </motion.div>

        <motion.div
          className="flex flex-col justify-center space-y-8"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Ubicación */}
          <motion.div
            className="flex items-start gap-6 p-6 bg-white/70 rounded-2xl shadow-sm border border-blue-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg relative overflow-hidden"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-white/10 to-transparent rounded-2xl"></div>
              <MapPin className="h-8 w-8 text-white relative z-10 drop-shadow-sm" />
            </motion.div>
            <div>
              <h3 className="font-bold text-xl text-gray-800 mb-3">Nuestra Ubicación</h3>
              <p className="text-xl text-gray-700 leading-relaxed mb-2">
                Nos encontramos en pleno centro de <strong>Sanlúcar de Barrameda</strong>
              </p>
              <p className="text-lg text-gray-600 mb-1">
                <strong>Calle San Juan, número 76</strong>
              </p>
              <p className="text-gray-500">
                Al lado del <strong>"Pradillo"</strong>
              </p>
            </div>
          </motion.div>

          {/* Teléfono */}
          <motion.div
            className="flex items-start gap-6 p-6 bg-white/70 rounded-2xl shadow-sm border border-green-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg relative overflow-hidden"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-white/10 to-transparent rounded-2xl"></div>
              <Phone className="h-8 w-8 text-white relative z-10 drop-shadow-sm" />
            </motion.div>
            <div>
              <h3 className="font-bold text-xl text-gray-800 mb-3">Teléfono</h3>
              <p className="text-xl text-gray-700 font-semibold mb-2">856 36 25 28</p>
              <p className="text-gray-500">Llámanos durante el horario de apertura</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ReseñasSection() {
  const { isAuthenticated } = useAuthStore();
  const { openLogin } = useAuthModal();
  const [reviews, setReviews] = useState<Resena[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [totalResenas, setTotalResenas] = useState(0);

  const [newReview, setNewReview] = useState({
    rating: 5,
    comentario: ''
  });

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const response = await resenasApi.getAll(0, 20);
      setReviews(response.data.resenas);
      setAverageRating(response.data.averageRating);
      setTotalResenas(response.data.totalResenas);
    } catch (error) {
      console.error('Error loading reviews:', error);
      toast.error('Error al cargar las reseñas');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async () => {
    // Verificar si el usuario está logueado
    if (!isAuthenticated) {
      openLogin();
      return;
    }

    if (!newReview.comentario.trim()) {
      toast.error('El comentario es obligatorio');
      return;
    }

    try {
      setSubmitting(true);
      await resenasApi.crear(newReview);
      toast.success('¡Reseña publicada exitosamente!');

      // Reset form
      setNewReview({
        rating: 5,
        comentario: ''
      });

      // Reload reviews
      await loadReviews();
    } catch (error: any) {
      console.error('Error creating review:', error);
      toast.error(error.response?.data?.error || 'Error al publicar la reseña');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      className="bg-white/60 backdrop-blur-sm rounded-3xl p-10 border border-gray-100"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 rounded-full bg-gradient-to-br from-slate-500 via-slate-600 to-gray-700 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-full"></div>
            <MessageSquare className="h-8 w-8 text-white relative z-10" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800">
            Reseñas de Clientes
          </h2>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Heart
                key={star}
                className={`h-6 w-6 ${
                  star <= Math.round(averageRating)
                    ? 'fill-rose-400 text-rose-500'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-2xl font-bold text-gray-800">{averageRating.toFixed(1)}</span>
          <span className="text-gray-600">({totalResenas} reseñas)</span>
        </div>

        <p className="text-xl text-gray-600 leading-relaxed">
          Descubre lo que dicen nuestros clientes sobre su experiencia en Doña Araña
        </p>
      </motion.div>

      {/* Reviews Grid */}
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
              <div className="space-y-2 mb-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                  <span className="font-bold text-primary text-lg">{review.iniciales}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{review.nombre}</h4>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Heart
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating
                            ? 'fill-rose-400 text-rose-500'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 mb-3 leading-relaxed">{review.comentario}</p>
              <span className="text-sm text-gray-500">
                {new Date(review.fechaCreacion).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </motion.div>
          ))}
        </div>
      )}

      {/* Write Review Form */}
      <motion.div
        className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-8 border border-rose-100 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg">
            <MessageSquare className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Escribe una reseña</h3>
        </div>

        <div className="space-y-8">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-4">
              Tu valoración
            </label>
            <div className="flex gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  className="transition-all duration-200 hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart
                    className={`h-10 w-10 ${
                      star <= newReview.rating
                        ? 'fill-rose-400 text-rose-500'
                        : 'text-gray-300 hover:text-rose-300'
                    }`}
                  />
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-4">
              Tu comentario
            </label>
            <textarea
              value={newReview.comentario}
              onChange={(e) => setNewReview({ ...newReview, comentario: e.target.value })}
              placeholder="Comparte tu experiencia con las demás..."
              className="w-full p-6 border-2 border-rose-200 rounded-2xl resize-none h-40 focus:outline-none focus:border-rose-300 focus:ring-0 text-gray-700 placeholder-gray-400 bg-white/80 backdrop-blur-sm transition-colors duration-200"
            />
          </div>

          <motion.button
            onClick={handleSubmitReview}
            disabled={submitting || !newReview.comentario.trim()}
            className="inline-flex items-center justify-center bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mx-auto"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {submitting ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Publicando tu reseña...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3">
                <Heart className="h-5 w-5" />
                Publicar Reseña
              </div>
            )}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function InfoClient() {
  return (
    <MainLayout className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <InfoHeader />

          <NuestraHistoriaSection />

          <div className="space-y-32">
            <ServiciosYProductosSection />

            <DondeEstamosSection />

            <SistemaApartadosSection />

            <ReseñasSection />

            <InstagramSection />
          </div>

        </div>
      </div>
    </MainLayout>
  );
}