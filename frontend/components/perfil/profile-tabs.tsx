'use client';

import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Heart, Package, Library } from 'lucide-react';

export default function ProfileTabs() {
  return (
    <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50 rounded-xl shadow-lg border border-gradient-to-r border-amber-200 p-1">
      <TabsList className="grid w-full grid-cols-3 bg-transparent p-0 h-auto">
        <TabsTrigger
          value="perfil"
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white text-gray-600 font-medium py-3 px-4 rounded-lg transition-all duration-200 text-center flex-1 min-w-0 flex items-center justify-center gap-2"
        >
          <User className="h-4 w-4" />
          Información
        </TabsTrigger>
        <TabsTrigger
          value="favoritos"
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-pink-600 data-[state=active]:text-white text-gray-600 font-medium py-3 px-4 rounded-lg transition-all duration-200 text-center flex-1 min-w-0 flex items-center justify-center gap-2"
        >
          <Heart className="h-4 w-4" />
          Favoritos
        </TabsTrigger>
        <TabsTrigger
          value="apartados"
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white text-gray-600 font-medium py-3 px-4 rounded-lg transition-all duration-200 text-center flex-1 min-w-0 flex items-center justify-center gap-2"
        >
          <Library className="h-4 w-4" />
          Apartados
        </TabsTrigger>
      </TabsList>
    </div>
  );
}