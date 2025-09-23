'use client';

import { Clock, MapPin, Phone, Mail, Instagram, Package, Heart, ShoppingBag, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/main-layout';

export default function InfoClient() {
  return (
    <MainLayout className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1
              className="text-4xl md:text-5xl font-bold mb-4 text-gray-800"
              style={{
                fontFamily: "'Wonderful Branding OTF', 'Wonderful Branding TTF', cursive",
              }}
            >
              Información y Contacto
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Todo lo que necesitas saber sobre nuestra tienda artesanal de lanas y materiales creativos
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            {/* Información de Contacto */}
            <Card className="border-2 border-gray-100 shadow-xl bg-white rounded-2xl relative overflow-hidden">
              <CardHeader className="bg-gray-50/50 rounded-t-2xl border-b border-gray-100 py-8">
                <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-800">
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  Contacto
                </CardTitle>
              </CardHeader>
              <CardContent className="p-10 space-y-8">
                <div className="flex items-start gap-5">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Dirección</h3>
                    <p className="text-gray-600">C. San Juan, 76</p>
                    <p className="text-gray-600">11540 Sanlúcar de Barrameda, Cádiz</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Teléfono</h3>
                    <p className="text-gray-600">856 36 25 28</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Instagram className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Instagram</h3>
                    <p className="text-gray-600">@dona_arana_sanlucar</p>
                    <p className="text-sm text-gray-500">Síguenos para ver nuestros últimos productos</p>
                  </div>
                </div>

                <div className="pt-6">
                  <a
                    href="https://www.instagram.com/dona_arana_sanlucar/?hl=es"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-[#E1306C] to-[#F56040] text-white hover:from-[#E1306C]/90 hover:to-[#F56040]/90 shadow-lg hover:shadow-xl transform hover:scale-105 h-12 rounded-lg px-8 text-base w-full sm:w-auto"
                  >
                    <Instagram className="mr-2 h-5 w-5" />
                    Síguenos
                  </a>
                </div>
              </CardContent>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center shadow-xl">
                <Phone className="w-12 h-12 text-primary" />
              </div>
            </Card>

            {/* Horarios */}
            <Card className="border-2 border-gray-100 shadow-xl bg-white rounded-2xl relative overflow-hidden">
              <CardHeader className="bg-gray-50/50 rounded-t-2xl border-b border-gray-100 py-8">
                <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-800">
                  <div className="p-3 rounded-xl bg-amber-100 border border-amber-200">
                    <Clock className="h-5 w-5 text-amber-600" />
                  </div>
                  Horarios de Apertura
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-800 text-base">Lunes</span>
                    <span className="text-gray-600 text-sm text-right">10:00 - 13:30</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-800 text-base">Martes</span>
                    <span className="text-gray-600 text-sm text-right">10:00 - 13:30<br/>18:00 - 21:00</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-800 text-base">Miércoles</span>
                    <span className="text-gray-600 text-sm text-right">10:00 - 13:30<br/>18:00 - 21:00</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-800 text-base">Jueves</span>
                    <span className="text-gray-600 text-sm text-right">10:00 - 13:30<br/>18:00 - 21:00</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-800 text-base">Viernes</span>
                    <span className="text-gray-600 text-sm text-right">10:00 - 13:30<br/>18:00 - 21:00</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-800 text-base">Sábado</span>
                    <span className="text-gray-600 text-sm text-right">10:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="font-medium text-gray-800 text-base">Domingo</span>
                    <span className="text-red-600 font-medium text-sm">Cerrado</span>
                  </div>
                </div>
              </CardContent>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center shadow-xl">
                <Calendar className="w-12 h-12 text-blue-600" />
              </div>
            </Card>

            {/* Información de Apartados */}
            <Card className="border-2 border-gray-100 shadow-xl bg-white rounded-2xl relative overflow-hidden">
              <CardHeader className="bg-gray-50/50 rounded-t-2xl border-b border-gray-100 py-8">
                <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-800">
                  <div className="p-3 rounded-xl bg-green-100 border border-green-200">
                    <Package className="h-5 w-5 text-green-600" />
                  </div>
                  Sistema de Apartados
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-100 rounded-lg mt-1">
                      <Clock className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-base">Duración del Apartado</h3>
                      <p className="text-gray-600 text-sm">Máximo 1 mes desde la fecha de reserva</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-100 rounded-lg mt-1">
                      <Instagram className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-base">Confirmación de Compra</h3>
                      <p className="text-gray-600 text-sm break-words">Contacta por Instagram @dona_arana_sanlucar</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-100 rounded-lg mt-1">
                      <Heart className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-base">Productos Favoritos</h3>
                      <p className="text-gray-600 text-sm">Marca tus productos favoritos para no perderlos</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                  <p className="text-sm text-green-800">
                    <strong>Importante:</strong> Pasado el tiempo límite, el producto volverá a estar disponible para otros clientes.
                  </p>
                </div>
              </CardContent>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-green-100 rounded-full flex items-center justify-center shadow-xl">
                <Package className="w-12 h-12 text-green-600" />
              </div>
            </Card>

            {/* Sobre Nosotros */}
            <Card className="border-2 border-gray-100 shadow-xl bg-white rounded-2xl md:col-span-2 relative overflow-hidden">
              <CardHeader className="bg-gray-50/50 rounded-t-2xl border-b border-gray-100 py-8">
                <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-800">
                  <div className="p-3 rounded-xl bg-rose-100 border border-rose-200">
                    <Heart className="h-5 w-5 text-rose-600" />
                  </div>
                  Sobre Doña Araña
                </CardTitle>
              </CardHeader>
              <CardContent className="p-12">
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    Bienvenido a <strong>Doña Araña</strong>, tu tienda artesanal de confianza ubicada en el corazón de Sanlúcar de Barrameda.
                    Nos especializamos en ofrecer materiales de alta calidad para todos tus proyectos creativos.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 mt-8">
                    <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                      <ShoppingBag className="h-8 w-8 text-primary mx-auto mb-3" />
                      <h3 className="font-bold text-gray-800 mb-2">Productos de Calidad</h3>
                      <p className="text-gray-600 text-sm">Seleccionamos cuidadosamente cada material para garantizar la mejor experiencia creativa</p>
                    </div>

                    <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-amber-100/50 to-amber-50 border border-amber-200">
                      <Heart className="h-8 w-8 text-amber-600 mx-auto mb-3" />
                      <h3 className="font-bold text-gray-800 mb-2">Atención Personalizada</h3>
                      <p className="text-gray-600 text-sm">Te ayudamos a encontrar exactamente lo que necesitas para tu próximo proyecto</p>
                    </div>

                    <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-rose-100/50 to-rose-50 border border-rose-200">
                      <Package className="h-8 w-8 text-rose-600 mx-auto mb-3" />
                      <h3 className="font-bold text-gray-800 mb-2">Sistema de Apartados</h3>
                      <p className="text-gray-600 text-sm">Reserva tus productos favoritos hasta que puedas completar tu compra</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-rose-100 rounded-full flex items-center justify-center shadow-xl">
                <Heart className="w-12 h-12 text-rose-600" />
              </div>
            </Card>
          </div>

          {/* Nueva sección: Sobre nosotros con imagen */}
          <div className="mt-16">
            <Card className="border-2 border-gray-100 shadow-xl bg-white rounded-2xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Imagen */}
                <div className="relative h-80 md:h-auto">
                  <img
                    src="/images/tienda-interior.jpg"
                    alt="Interior de la tienda Doña Araña"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Contenido */}
                <CardContent className="p-8 flex flex-col justify-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Nuestra Historia
                  </h2>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      Doña Araña nació del amor por las manualidades y la tradición artesanal de Sanlúcar de Barrameda.
                      Desde hace años, nos dedicamos a ofrecer los mejores materiales para que puedas dar vida a tus proyectos creativos.
                    </p>
                    <p>
                      En nuestra tienda encontrarás una cuidadosa selección de lanas, hilos y materiales de la más alta calidad.
                      Nos enorgullece ser parte de cada proyecto especial que nuestros clientes crean con nuestros productos.
                    </p>
                    <p>
                      Ven a visitarnos y déjate inspirar por nuestro mundo de colores y texturas.
                      Te ayudaremos a encontrar exactamente lo que necesitas para tu próxima creación.
                    </p>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}