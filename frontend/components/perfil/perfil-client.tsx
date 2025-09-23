'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs } from '@/components/ui/tabs';
import MainLayout from '@/components/layout/main-layout';
import { useAuthStore } from '@/store/auth';
import { usuariosApi, apartadosApi, type Apartado } from '@/lib/api';
import ProfileHeader from './profile-header';
import ProfileTabs from './profile-tabs';
import InfoTab from './info-tab';
import FavoritesTab from './favorites-tab';
import ApartadosTab from './apartados-tab';
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
      <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-200px)]">
        <div className="max-w-4xl mx-auto">
          <ProfileHeader user={user} />

          <Tabs defaultValue="perfil" className="space-y-8">
            <ProfileTabs />

            <InfoTab
              userData={userData}
              loading={loading}
              onUserDataChange={setUserData}
              onSubmit={handleUpdateProfile}
            />

            <FavoritesTab />

            <ApartadosTab
              apartados={apartados}
              apartadosLoading={apartadosLoading}
              onEliminarApartado={handleEliminarApartado}
            />
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}