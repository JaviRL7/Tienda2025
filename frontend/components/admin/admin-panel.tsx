'use client';

import { useState } from 'react';
import { Settings, Package, Users, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MainLayout from '@/components/layout/main-layout';
import ProductsAdmin from './products-admin';
import UsersAdmin from './users-admin';
import GalleryAdmin from './gallery-admin';
import { useAuthStore } from '@/store/auth';

export default function AdminPanel() {
  const { user } = useAuthStore();

  return (
    <MainLayout className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-primary/10">
                <Settings className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{
                fontFamily: "'Wonderful Branding OTF', 'Wonderful Branding TTF', cursive",
              }}
            >
              Panel de Administración
            </h1>
            <p className="text-muted-foreground text-lg">
              Bienvenido/a <span className="font-semibold text-primary">{user?.nombre}</span>, gestiona tu tienda desde aquí
            </p>
          </div>

          <Tabs defaultValue="productos" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm rounded-lg border border-gray-200">
              <TabsTrigger
                value="productos"
                className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md transition-all duration-200"
              >
                <Package className="h-4 w-4 mr-2" />
                Productos
              </TabsTrigger>
              <TabsTrigger
                value="usuarios"
                className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md transition-all duration-200"
              >
                <Users className="h-4 w-4 mr-2" />
                Usuarios
              </TabsTrigger>
              <TabsTrigger
                value="galeria"
                className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md transition-all duration-200"
              >
                <Tag className="h-4 w-4 mr-2" />
                Galería
              </TabsTrigger>
            </TabsList>

            <TabsContent value="productos">
              <ProductsAdmin />
            </TabsContent>

            <TabsContent value="usuarios">
              <UsersAdmin />
            </TabsContent>

            <TabsContent value="galeria">
              <GalleryAdmin />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}