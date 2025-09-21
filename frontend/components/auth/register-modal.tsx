'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authApi, type RegisterRequest } from '@/lib/api';
import { Heart, Mail, Lock, User, X } from 'lucide-react';

const registerSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  correo: z.string().email('Correo electrónico inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const { confirmPassword, ...registerData } = data;
      await authApi.register(registerData);
      toast.success('¡Bienvenida a la familia de Doña Araña! Ya puedes iniciar sesión.');
      onSwitchToLogin();
      reset();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al crear la cuenta');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Simple backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={handleClose}
      />

      {/* Modal without glass effect */}
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-xl border overflow-hidden">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
        >
          <X className="h-4 w-4 text-gray-600" />
        </button>

        {/* Header */}
        <div className="text-center px-16 pt-16 pb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-rose-100">
              <Heart className="h-8 w-8 text-rose-500" />
            </div>
          </div>
          <h2
            className="text-3xl md:text-4xl mb-3"
            style={{
              fontFamily: "'Wonderful Branding OTF', 'Wonderful Branding TTF', cursive",
            }}
          >
            Únete a la familia
          </h2>
          <p className="text-muted-foreground text-lg">
            Forma parte de nuestra comunidad lanera
          </p>
        </div>

        {/* Content */}
        <div className="px-16 pb-16">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nombre" className="flex items-center gap-2 text-lg font-medium">
                <User className="h-4 w-4 text-primary" />
                Nombre Completo
              </Label>
              <Input
                id="nombre"
                {...register('nombre')}
                className="h-11 border-2 border-gray-200 focus:border-primary rounded-xl transition-all duration-200"
                placeholder="¿Cómo te llamas?"
              />
              {errors.nombre && (
                <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                  <span className="w-1 h-1 rounded-full bg-red-600"></span>
                  {errors.nombre.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="correo" className="flex items-center gap-2 text-lg font-medium">
                <Mail className="h-4 w-4 text-primary" />
                Correo Electrónico
              </Label>
              <Input
                id="correo"
                type="email"
                {...register('correo')}
                className="h-11 border-2 border-gray-200 focus:border-primary rounded-xl transition-all duration-200"
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
              <Label htmlFor="password" className="flex items-center gap-2 text-lg font-medium">
                <Lock className="h-4 w-4 text-primary" />
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                {...register('password')}
                className="h-11 border-2 border-gray-200 focus:border-primary rounded-xl transition-all duration-200"
                placeholder="Mínimo 6 caracteres"
              />
              {errors.password && (
                <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                  <span className="w-1 h-1 rounded-full bg-red-600"></span>
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="flex items-center gap-2 text-lg font-medium">
                <Lock className="h-4 w-4 text-primary" />
                Confirmar Contraseña
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                className="h-11 border-2 border-gray-200 focus:border-primary rounded-xl transition-all duration-200"
                placeholder="Repite tu contraseña"
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                  <span className="w-1 h-1 rounded-full bg-red-600"></span>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="flex gap-8 items-center justify-center">
              <Button
                type="submit"
                className="h-10 text-sm font-medium bg-primary hover:bg-primary/90 rounded-xl transition-all duration-200 px-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creando cuenta...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    Unirme a Doña Araña
                  </div>
                )}
              </Button>

              <button
                type="button"
                onClick={onSwitchToLogin}
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors duration-200 text-sm px-4"
              >
                <User className="h-4 w-4" />
                Ya tengo cuenta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}