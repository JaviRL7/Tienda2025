'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { authApi, type LoginRequest } from '@/lib/api';
import { useAuthStore } from '@/store/auth';
import { LogIn, Mail, Lock, UserPlus, Home } from 'lucide-react';

const loginSchema = z.object({
  correo: z.string().email('Correo electrónico inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

export default function LoginForm({ onSuccess, onSwitchToRegister }: LoginFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await authApi.login(data);
      const { token, nombre, correo, id, rol } = response.data;

      login(token, { id, nombre, correo, rol });
      toast.success('¡Bienvenida de vuelta!');
      onSuccess?.(); // Cerrar modal
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error);
      let errorMessage = 'Error al iniciar sesión';

      if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        errorMessage = 'No se puede conectar al servidor. Verifica que el backend esté funcionando.';
      } else if (error.response?.status === 401) {
        errorMessage = 'Credenciales incorrectas. Verifica tu correo y contraseña.';
      } else if (error.response?.status === 404) {
        errorMessage = 'No existe una cuenta con este correo electrónico.';
      } else if (error.response?.status >= 500) {
        errorMessage = 'Error interno del servidor. Intenta nuevamente más tarde.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-amber-50/30 backdrop-blur-sm">
      <CardHeader className="text-center space-y-4 pb-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-t-lg">
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg">
            <LogIn className="h-8 w-8 text-white" />
          </div>
        </div>
        <div className="space-y-2">
          <CardTitle
            className="text-2xl md:text-3xl"
            style={{
              fontFamily: "'Wonderful Branding OTF', 'Wonderful Branding TTF', cursive",
            }}
          >
            ¡Bienvenida de vuelta!
          </CardTitle>
          <p className="text-muted-foreground text-lg">
            Accede a tu rincón creativo
          </p>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="correo" className="flex items-center gap-2 text-sm font-medium">
              <Mail className="h-4 w-4 text-primary" />
              Correo Electrónico
            </Label>
            <Input
              id="correo"
              type="email"
              {...register('correo')}
              className="h-12 border-2 border-gray-200 focus:border-primary rounded-xl transition-all duration-200"
              placeholder="tu.email@ejemplo.com"
            />
            {errors.correo && (
              <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                <span className="w-1 h-1 rounded-full bg-red-600"></span>
                {errors.correo.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2 text-sm font-medium">
              <Lock className="h-4 w-4 text-primary" />
              Contraseña
            </Label>
            <Input
              id="password"
              type="password"
              {...register('password')}
              className="h-12 border-2 border-gray-200 focus:border-primary rounded-xl transition-all duration-200"
              placeholder="Tu contraseña"
            />
            {errors.password && (
              <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                <span className="w-1 h-1 rounded-full bg-red-600"></span>
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Accediendo...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Entrar a mi cuenta
              </div>
            )}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-muted-foreground">¿Primera vez aquí?</span>
            </div>
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors duration-200"
            >
              <UserPlus className="h-4 w-4" />
              Únete a la familia
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}