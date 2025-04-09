import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";


export async function PUT(req: Request) {
  // Obtenemos la sesión del lado del servidor
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !(session.user as { id: string }).id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }
  // Convertir el ID a número (ajusta según tu modelo en Prisma)
  const userId = Number((session.user as { id: string }).id);


  // Extraemos los datos enviados en el cuerpo
  const body = await req.json();
  const { name, email } = body;


  try {
    const updatedUser = await prisma.usuarios.update({
      where: { id: userId },
      data: { nombre: name, correo: email },
    });


    return NextResponse.json({ message: "Perfil actualizado", user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    return NextResponse.json({ error: "Error al actualizar el perfil" }, { status: 500 });
  }
}
