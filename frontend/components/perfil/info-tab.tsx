'use client';

import { useState } from 'react';
import { User, Mail, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';

interface InfoTabProps {
  userData: {
    nombre: string;
    correo: string;
  };
  loading: boolean;
  onUserDataChange: (userData: { nombre: string; correo: string }) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function InfoTab({ userData, loading, onUserDataChange, onSubmit }: InfoTabProps) {
  return (
    <TabsContent value="perfil">
      <Card className="border-2 border-gray-100 shadow-xl bg-white rounded-2xl">
        <CardHeader className="bg-gray-50/50 rounded-t-2xl border-b border-gray-100 py-6">
          <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-800">
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
              <User className="h-5 w-5 text-primary" />
            </div>
            Información Personal
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={onSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="nombre" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <User className="h-4 w-4 text-primary" />
                  Nombre Completo
                </Label>
                <Input
                  id="nombre"
                  value={userData.nombre}
                  onChange={(e) => onUserDataChange({ ...userData, nombre: e.target.value })}
                  className="h-12 border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl transition-all duration-200 bg-gray-50/50 focus:bg-white"
                  placeholder="Tu nombre completo"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="correo" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Mail className="h-4 w-4 text-primary" />
                  Correo Electrónico
                </Label>
                <Input
                  id="correo"
                  type="email"
                  value={userData.correo}
                  onChange={(e) => onUserDataChange({ ...userData, correo: e.target.value })}
                  className="h-12 border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl transition-all duration-200 bg-gray-50/50 focus:bg-white"
                  placeholder="tu.email@ejemplo.com"
                />
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="px-8 py-3 h-12 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-70"
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
            </div>
          </form>
        </CardContent>
      </Card>
    </TabsContent>
  );
}