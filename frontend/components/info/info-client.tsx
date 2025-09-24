'use client';

import { MapPin, Phone, Instagram, Package, Heart, ShoppingBag, BookOpen } from 'lucide-react';
import MainLayout from '@/components/layout/main-layout';

function InfoHeader() {
  return (
    <div className="my-20 text-center">
      <h1
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-800"
        style={{
          fontFamily: "'Wonderful Branding OTF', 'Wonderful Branding TTF', cursive",
        }}
      >
        Información y Contacto
      </h1>
      <p className="text-gray-600 text-xl max-w-2xl mx-auto">
        Todo lo que necesitas saber sobre nuestra tienda artesanal de lanas y materiales creativos
      </p>
    </div>
  );
}

function NuestraHistoriaSection() {
  return (
    <div className="mt-32 mb-32">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
          <img
            src="/images/tienda-interior.jpg"
            alt="Interior de la tienda Doña Araña"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8"
            style={{
              fontFamily: "'Wonderful Branding OTF', 'Wonderful Branding TTF', cursive",
            }}
          >
            Nuestra Historia
          </h2>
          <div className="space-y-6 text-gray-700">
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
          </div>
        </div>
      </div>
    </div>
  );
}

function QueOfrecemosSection() {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-10 border border-gray-100">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-12 text-center"
        style={{
          fontFamily: "'Wonderful Branding OTF', 'Wonderful Branding TTF', cursive",
        }}
      >
        Qué Ofrecemos
      </h2>

      <div className="flex flex-col md:flex-row justify-around items-start md:items-center gap-8">
        <div className="flex-1 text-center group">
          <div className="mx-auto mb-6 w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <ShoppingBag className="h-12 w-12 text-primary" />
          </div>
          <h3 className="font-bold text-xl text-gray-800 mb-3">Productos Katia</h3>
          <p className="text-gray-600 text-base">Lanas y materiales de la mejor calidad de la marca Katia</p>
        </div>

        <div className="flex-1 text-center group">
          <div className="mx-auto mb-6 w-24 h-24 rounded-full bg-gradient-to-br from-amber-200/60 to-amber-100/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Heart className="h-12 w-12 text-amber-600" />
          </div>
          <h3 className="font-bold text-xl text-gray-800 mb-3">La Mejor Atención</h3>
          <p className="text-gray-600 text-base">Atención personalizada y asesoramiento para tus proyectos</p>
        </div>

        <div className="flex-1 text-center group">
          <div className="mx-auto mb-6 w-24 h-24 rounded-full bg-gradient-to-br from-rose-200/60 to-rose-100/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <BookOpen className="h-12 w-12 text-rose-600" />
          </div>
          <h3 className="font-bold text-xl text-gray-800 mb-3">Guías y Accesorios</h3>
          <p className="text-gray-600 text-base">Todo lo necesario para aprender y desarrollar tus habilidades</p>
        </div>
      </div>
    </div>
  );
}

function ContactoSection() {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-10 border border-gray-100">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-12 text-center"
        style={{
          fontFamily: "'Wonderful Branding OTF', 'Wonderful Branding TTF', cursive",
        }}
      >
        Contacto
      </h2>

      <div className="flex flex-col md:flex-row justify-around items-start md:items-center gap-8 mb-12">
        <div className="flex-1 text-center group">
          <div className="mx-auto mb-6 w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <MapPin className="h-12 w-12 text-primary" />
          </div>
          <h3 className="font-bold text-xl text-gray-800 mb-3">Dirección</h3>
          <p className="text-gray-600 text-base">C. San Juan, 76</p>
          <p className="text-gray-600 text-base">11540 Sanlúcar de Barrameda</p>
        </div>

        <div className="flex-1 text-center group">
          <div className="mx-auto mb-6 w-24 h-24 rounded-full bg-gradient-to-br from-green-200/60 to-green-100/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Phone className="h-12 w-12 text-green-600" />
          </div>
          <h3 className="font-bold text-xl text-gray-800 mb-3">Teléfono</h3>
          <p className="text-gray-600 text-base">856 36 25 28</p>
        </div>

        <div className="flex-1 text-center group">
          <div className="mx-auto mb-6 w-24 h-24 rounded-full bg-gradient-to-br from-rose-200/60 to-rose-100/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Instagram className="h-12 w-12 text-rose-600" />
          </div>
          <h3 className="font-bold text-xl text-gray-800 mb-3">Instagram</h3>
          <p className="text-gray-600 text-base">@dona_arana_sanlucar</p>
        </div>
      </div>

      <div className="text-center mt-16">
        <div className="flex justify-center mb-8">
          <div className="p-6 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400 shadow-xl">
            <Instagram className="h-12 w-12 text-white" />
          </div>
        </div>

        <h3 className="text-3xl md:text-4xl mb-8 text-gray-800">
          <span className="font-normal">¿Tienes alguna consulta?</span>
          <br />
          <span
            className="block mt-4"
            style={{
              fontFamily: "'Wonderful Branding OTF', 'Wonderful Branding TTF', cursive",
            }}
          >
            ¡Contáctanos!
          </span>
        </h3>

        <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto">
          Síguenos en Instagram para estar al día de todas nuestras novedades, productos y consejos para tus proyectos creativos
        </p>

        <a
          href="https://www.instagram.com/dona_arana_sanlucar/?hl=es"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center font-bold text-xl transition-all duration-300 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 text-white hover:scale-105 shadow-lg hover:shadow-xl h-16 rounded-full px-12"
        >
          <Instagram className="mr-4 h-6 w-6" />
          Síguenos en Instagram
        </a>
      </div>
    </div>
  );
}

function HorariosSection() {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-10 border border-gray-100">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center"
        style={{
          fontFamily: "'Wonderful Branding OTF', 'Wonderful Branding TTF', cursive",
        }}
      >
        Horarios
      </h2>
      <p className="text-center text-gray-600 text-lg mb-8">Abiertos todos los días menos los lunes por la tarde</p>
      <div className="max-w-2xl mx-auto space-y-3">
        <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-xl">
          <span className="font-medium text-gray-800 text-base">Lunes</span>
          <span className="text-gray-600 text-base">10:00 - 13:30</span>
        </div>
        <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-xl">
          <span className="font-medium text-gray-800 text-base">Martes - Viernes</span>
          <span className="text-gray-600 text-base">10:00 - 13:30 | 18:00 - 21:00</span>
        </div>
        <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-xl">
          <span className="font-medium text-gray-800 text-base">Sábado</span>
          <span className="text-gray-600 text-base">10:00 - 14:00</span>
        </div>
        <div className="flex justify-between items-center py-3 px-4 bg-red-50 rounded-xl">
          <span className="font-medium text-gray-800 text-base">Domingo</span>
          <span className="text-red-600 font-medium text-base">Cerrado</span>
        </div>
      </div>
    </div>
  );
}

function SistemaApartadosSection() {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-10 border border-gray-100">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-12 text-center"
        style={{
          fontFamily: "'Wonderful Branding OTF', 'Wonderful Branding TTF', cursive",
        }}
      >
        Sistema de apartados
      </h2>
      <div className="flex flex-col md:flex-row justify-around items-start md:items-center gap-8">
        <div className="flex-1 text-center group">
          <div className="mx-auto mb-6 w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Heart className="h-12 w-12 text-primary" />
          </div>
          <div className="w-12 h-1 bg-primary/30 mx-auto mb-4 rounded-full"></div>
          <h3 className="font-bold text-xl text-gray-800 mb-3">1. Marca favoritos</h3>
          <p className="text-gray-600 text-base">Añade productos a tu lista de favoritos mientras exploras la tienda</p>
        </div>

        <div className="flex-1 text-center group">
          <div className="mx-auto mb-6 w-24 h-24 rounded-full bg-gradient-to-br from-green-200/60 to-green-100/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Package className="h-12 w-12 text-green-600" />
          </div>
          <div className="w-12 h-1 bg-green-400 mx-auto mb-4 rounded-full"></div>
          <h3 className="font-bold text-xl text-gray-800 mb-3">2. Aparta tu producto</h3>
          <p className="text-gray-600 text-base">Reserva el producto durante máximo 1 mes desde tu perfil</p>
        </div>

        <div className="flex-1 text-center group">
          <div className="mx-auto mb-6 w-24 h-24 rounded-full bg-gradient-to-br from-amber-200/60 to-amber-100/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Instagram className="h-12 w-12 text-amber-600" />
          </div>
          <div className="w-12 h-1 bg-amber-400 mx-auto mb-4 rounded-full"></div>
          <h3 className="font-bold text-xl text-gray-800 mb-3">3. Confirma tu compra</h3>
          <p className="text-gray-600 text-base">Contacta por Instagram @dona_arana_sanlucar para finalizar</p>
        </div>
      </div>

      <div className="mt-10 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl">
        <p className="text-base text-green-800 text-center">
          <strong>Importante:</strong> Pasado el tiempo límite, el producto volverá a estar disponible para otros clientes.
        </p>
      </div>
    </div>
  );
}

function DondeEstamosSection() {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-10 border border-gray-100">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-12 text-center"
        style={{
          fontFamily: "'Wonderful Branding OTF', 'Wonderful Branding TTF', cursive",
        }}
      >
        Dónde estamos
      </h2>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative h-96 rounded-3xl overflow-hidden shadow-xl">
          <img
            src="/conocenos/PRADILLO.jpg"
            alt="El Pradillo - Referencia de ubicación"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            Nos encontramos en pleno centro de <strong>Sanlúcar de Barrameda</strong>
          </p>
          <p className="text-lg text-gray-600 mb-4">
            <strong>Calle San Juan, número 76</strong>
          </p>
          <p className="text-lg text-gray-600">
            Al lado del <strong>"Pradillo"</strong>
          </p>
        </div>
      </div>
    </div>
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
            <QueOfrecemosSection />

            <ContactoSection />

            <HorariosSection />

            <SistemaApartadosSection />

            <DondeEstamosSection />
          </div>

        </div>
      </div>
    </MainLayout>
  );
}