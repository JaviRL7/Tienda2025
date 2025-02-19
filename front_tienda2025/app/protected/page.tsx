// app/protected/page.tsx

'use client';

import { useSession } from 'next-auth/react';

const ProtectedPage = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Cargando...</div>;
  }

  if (!session) {
    return <div>No tienes acceso. Por favor inicia sesión.</div>;
  }

  return (
    <div>
      <h1>Página protegida</h1>
      <p>Bienvenido, {session.user?.name}</p>
    </div>
  );
};

export default ProtectedPage;
