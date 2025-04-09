import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export async function GET(req: Request) {
  // 1. Obtenemos la sesión del usuario usando las opciones de autenticación de NextAuth
  const session = await getServerSession(authOptions);
  
 
  if (!session || !session.user || !(session.user as { id: string }).id) {
    
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const userId = Number((session.user as { id: string }).id);

  try {
    const user = await prisma.usuarios.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }
    // 6. Si encontramos al usuario, devolvemos sus datos en formato JSON con status 200
    return NextResponse.json(
      {
        id: user.id,
        name: user.nombre,
        email: user.correo,
      },
      { status: 200 }
    );
  } catch (error) {
   
    console.error("Error obteniendo el usuario:", error);
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
}
