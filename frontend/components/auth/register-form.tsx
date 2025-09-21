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
import { authApi, type RegisterRequest } from '@/lib/api';
import { UserPlus, Mail, Lock, User, Heart } from 'lucide-react';

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

export default function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const { confirmPassword, ...registerData } = data;
      await authApi.register(registerData);
      toast.success('¡Bienvenida a la familia de Doña Araña! Ya puedes iniciar sesión.');
      router.push('/auth/login');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al crear la cuenta');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-amber-50/30 backdrop-blur-sm">
      <CardHeader className="text-center space-y-4 pb-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-t-lg">
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg">
            <UserPlus className="h-8 w-8 text-white" />
          </div>
        </div>
        <div className="space-y-2">
          <CardTitle
            className="text-2xl md:text-3xl"
            style={{
              fontFamily: "'Wonderful Branding OTF', 'Wonderful Branding TTF', cursive",
            }}
          >
            Únete a la familia
          </CardTitle>
          <p className="text-muted-foreground text-lg">
            Forma parte de nuestra comunidad lanera
          </p>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nombre" className="flex items-center gap-2 text-sm font-medium">
              <User className="h-4 w-4 text-primary" />
              Nombre Completo
            </Label>
            <Input
              id="nombre"
              {...register('nombre')}
              className="h-12 border-2 border-gray-200 focus:border-primary rounded-xl transition-all duration-200"
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
            <Label htmlFor="confirmPassword" className="flex items-center gap-2 text-sm font-medium">
              <Lock className="h-4 w-4 text-primary" />
              Confirmar Contraseña
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
              className="h-12 border-2 border-gray-200 focus:border-primary rounded-xl transition-all duration-200"
              placeholder="Repite tu contraseña"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                <span className="w-1 h-1 rounded-full bg-red-600"></span>
                {errors.confirmPassword.message}
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
                Creando tu cuenta...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Unirme a Doña Araña
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
              <span className="bg-white px-4 text-muted-foreground">¿Ya formas parte de la familia?</span>
            </div>
          </div>

          <div className="mt-4">
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors duration-200"
            >
              <User className="h-4 w-4" />
              Accede a tu cuenta
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}