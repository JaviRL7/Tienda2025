'use client';

import type { Usuario } from '@/lib/api';

interface ProfileHeaderProps {
  user: Usuario | null;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="mb-12 text-center">
      <h1
        className="text-4xl md:text-5xl font-bold mb-4 mt-8 text-gray-800"
        style={{
          fontFamily: "'Wonderful Branding OTF', 'Wonderful Branding TTF', cursive",
        }}
      >
        Mi Perfil
      </h1>
      <p className="text-gray-600 text-xl max-w-2xl mx-auto">
        Bienvenida <span className="font-semibold text-primary">{user?.nombre}</span>
      </p>
    </div>
  );
}