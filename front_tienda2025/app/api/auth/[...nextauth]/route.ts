// app/api/auth/[...nextauth]/route.ts

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../../lib/prisma'; // Ajusta la ruta según tu estructura
import bcrypt from 'bcryptjs'; // Usamos bcryptjs en lugar de bcrypt para evitar problemas con el empaquetado
import { User } from 'next-auth';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        correo: { label: 'Correo', type: 'email' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.correo || !credentials?.password) {
          return null; // Si no se proporcionan credenciales, no se autoriza el acceso
        }

        // Buscamos el usuario en la base de datos
        const user = await prisma.usuarios.findUnique({
          where: { correo: credentials.correo },
        });

        // Si se encuentra el usuario y las credenciales coinciden
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          // Devolvemos un objeto compatible con el tipo User de NextAuth
          return {
            id: String(user.id), // Convierte el id a string
            name: user.nombre,    // Incluye el nombre como 'name' en lugar de 'nombre'
            email: user.correo,   // Incluye el correo como 'email'
          } as User;
        }

        return null; // Si no se encuentra el usuario o las credenciales no coinciden
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin', // Página personalizada de inicio de sesión
  },
});

export { handler as GET, handler as POST };
