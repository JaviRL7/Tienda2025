import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Asegúrate de importar correctamente Prisma
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    // Log para ver qué datos recibimos
    const requestBody = await req.json();
    console.log("Datos recibidos:", requestBody);

    const { nombre, correo, password } = requestBody;

    if (!nombre || !correo || !password) {
      console.log("Faltan datos:", { nombre, correo, password });
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    // Verifica si el usuario ya existe
    const usuarioExistente = await prisma.usuarios.findUnique({
      where: { correo },
    });

    console.log("Usuario existente:", usuarioExistente);

    if (usuarioExistente) {
      return NextResponse.json({ error: "El correo ya está registrado" }, { status: 400 });
    }

    // Cifrar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Guarda el usuario en la base de datos con la contraseña cifrada
    const nuevoUsuario = await prisma.usuarios.create({
      data: { nombre, correo, password: hashedPassword },
    });

    console.log("Nuevo usuario creado:", nuevoUsuario);

    return NextResponse.json({ message: "Usuario registrado" }, { status: 201 });
  } catch (error) {
    console.error("Error en el servidor:", error);
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}
