import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Correo", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        console.log("Credenciales recibidas:", credentials);

        if (!credentials?.email || !credentials?.password) {
          console.log("Faltan credenciales");
          return null;
        }

        const user = await prisma.usuarios.findUnique({
          where: { correo: credentials.email },
        });

        if (!user) {
          console.log("Usuario no encontrado para el email:", credentials.email);
          return null;
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        console.log("Resultado de bcrypt.compare:", isValid);

        if (!isValid) {
          console.log("Contraseña incorrecta para el usuario:", user.correo);
          return null;
        }

        console.log("Usuario autenticado:", user);
        return {
          id: user.id.toString(),
          name: user.nombre,
          email: user.correo,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
