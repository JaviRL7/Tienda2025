import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Asegúrate de importar correctamente Prisma

export async function POST(req: Request) {
  try {
    const { nombre, correo, password } = await req.json();

    if (!nombre || !correo || !password) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    // Verifica si el usuario ya existe
    const usuarioExistente = await prisma.usuarios.findUnique({ // <-- Cambiado a "usuarios"
      where: { correo },
    });

    if (usuarioExistente) {
      return NextResponse.json({ error: "El correo ya está registrado" }, { status: 400 });
    }

    // Guarda el usuario en la base de datos
    const nuevoUsuario = await prisma.usuarios.create({ // <-- Cambiado a "usuarios"
      data: { nombre, correo, password },
    });

    return NextResponse.json({ message: "Usuario registrado" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}
