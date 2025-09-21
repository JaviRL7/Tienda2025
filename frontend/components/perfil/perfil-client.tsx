'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Save, Package, Clock, Calendar, Heart, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MainLayout from '@/components/layout/main-layout';
import { useAuthStore } from '@/store/auth';
import { usuariosApi, apartadosApi, type Usuario, type Apartado } from '@/lib/api';
import toast from 'react-hot-toast';

export default function PerfilClient() {
  const { user, isAuthenticated, updateUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [apartados, setApartados] = useState<Apartado[]>([]);
  const [apartadosLoading, setApartadosLoading] = useState(true);
  const [userData, setUserData] = useState({
    nombre: '',
    correo: '',
  });
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    if (user) {
      setUserData({
        nombre: user.nombre,
        correo: user.correo,
      });
    }

    loadApartados();
  }, [isAuthenticated, user, router]);

  const loadApartados = async () => {
    try {
      const response = await apartadosApi.getMisApartados();
      setApartados(response.data);
    } catch (error) {
      console.error('Error al cargar apartados:', error);
    } finally {
      setApartadosLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await usuariosApi.updateMe(userData);
      updateUser(response.data);
      toast.success('¡Perfil actualizado con cariño!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleEliminarApartado = async (apartadoId: number) => {
    try {
      await apartadosApi.eliminar(apartadoId);
      setApartados(apartados.filter(a => a.id !== apartadoId));
      toast.success('Apartado eliminado exitosamente');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al eliminar apartado');
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <MainLayout className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header mejorado */}
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg">
                <User className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{
                fontFamily: "'Wonderful Branding OTF', 'Wonderful Branding TTF', cursive",
              }}
            >
              Tu rincón personal
            </h1>
            <p className="text-muted-foreground text-lg">
              Hola <span className="font-semibold text-primary">{user?.nombre}</span>, aquí puedes gestionar tu espacio creativo
            </p>
          </div>

          <Tabs defaultValue="perfil" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-white shadow-md rounded-xl border-0">
              <TabsTrigger
                value="perfil"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white rounded-lg transition-all duration-200"
              >
                <Settings className="h-4 w-4 mr-2" />
                Mi Información
              </TabsTrigger>
              <TabsTrigger
                value="apartados"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white rounded-lg transition-all duration-200"
              >
                <Heart className="h-4 w-4 mr-2" />
                Mis Apartados
              </TabsTrigger>
            </TabsList>

            <TabsContent value="perfil">
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <div className="p-2 rounded-full bg-primary/10">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    Información Personal
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleUpdateProfile} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="nombre" className="flex items-center gap-2 text-sm font-medium">
                        <User className="h-4 w-4 text-primary" />
                        Nombre Completo
                      </Label>
                      <Input
                        id="nombre"
                        value={userData.nombre}
                        onChange={(e) => setUserData({ ...userData, nombre: e.target.value })}
                        className="h-12 border-2 border-gray-200 focus:border-primary rounded-xl transition-all duration-200"
                        placeholder="Tu nombre completo"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="correo" className="flex items-center gap-2 text-sm font-medium">
                        <Mail className="h-4 w-4 text-primary" />
                        Correo Electrónico
                      </Label>
                      <Input
                        id="correo"
                        type="email"
                        value={userData.correo}
                        onChange={(e) => setUserData({ ...userData, correo: e.target.value })}
                        className="h-12 border-2 border-gray-200 focus:border-primary rounded-xl transition-all duration-200"
                        placeholder="tu.email@ejemplo.com"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Guardando con cariño...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Save className="h-4 w-4" />
                          Guardar Cambios
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="apartados">
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <span
                      style={{
                        fontFamily: "'Wonderful Branding OTF', 'Wonderful Branding TTF', cursive",
                      }}
                    >
                      Mis productos apartados
                    </span>
                    <span className="ml-2 bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
                      {apartados.length}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  {apartadosLoading ? (
                    <div className="flex flex-col items-center justify-center py-16">
                      <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
                      <p className="text-muted-foreground">Cargando tus productos...</p>
                    </div>
                  ) : apartados.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="p-6 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                        <Package className="h-12 w-12 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Aún no tienes productos apartados
                      </h3>
                      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                        Descubre nuestras lanas y materiales, aparta los que más te gusten para no perderlos
                      </p>
                      <Button
                        onClick={() => router.push('/tienda')}
                        className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        Explorar la Tienda
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {apartados.map((apartado) => (
                        <div
                          key={apartado.id}
                          className="flex items-center justify-between p-6 border-2 border-gray-100 rounded-xl hover:shadow-md hover:border-primary/20 transition-all duration-200 bg-white/50"
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground text-lg">
                              {apartado.producto.codigoColor}
                            </h4>
                            <p className="text-muted-foreground">
                              {apartado.producto.codigoTintada}
                            </p>
                            <div className="flex items-center gap-6 mt-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-primary" />
                                <span>Apartado: {new Date(apartado.fechaApartado).toLocaleDateString()}</span>
                              </span>
                              <span className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-secondary" />
                                <span>Expira: {new Date(apartado.fechaExpiracion).toLocaleDateString()}</span>
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-xl text-primary">
                              {new Intl.NumberFormat('es-ES', {
                                style: 'currency',
                                currency: 'EUR'
                              }).format(apartado.producto.precio)}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => router.push(`/tienda/${apartado.producto.id}`)}
                              className="border-2 border-primary/30 text-primary hover:bg-primary hover:text-white transition-all duration-200"
                            >
                              Ver Producto
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleEliminarApartado(apartado.id)}
                              className="bg-red-500 hover:bg-red-600 transition-all duration-200"
                            >
                              Eliminar
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}