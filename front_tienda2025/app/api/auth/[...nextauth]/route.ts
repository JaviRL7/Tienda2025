import prisma from "../../../../lib/prisma"; // Importa tu cliente Prisma correctamente
import bcrypt from 'bcryptjs'; // Utilizamos bcryptjs para mayor compatibilidad

export async function POST(req: Request) {
  try {
    const { nombre, correo, password } = await req.json(); // Extrae los datos del cuerpo de la solicitud

    // Verificar si todos los campos están presentes
    if (!nombre || !correo || !password) {
      return new Response(
        JSON.stringify({ error: 'Todos los campos son obligatorios' }),
        { status: 400 }
      );
    }

    // Verificar si el correo ya está registrado
    const existingUser = await prisma.usuarios.findUnique({
      where: { correo },
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({ error: 'El correo ya está registrado' }),
        { status: 400 }
      );
    }

    // Encriptar la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    const newUser = await prisma.usuarios.create({
      data: {
        nombre,
        correo,
        password: hashedPassword,
      },
    });

    return new Response(
      JSON.stringify({ message: 'Usuario registrado correctamente', user: newUser }),
      { status: 201 } // Código de éxito para creación
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Hubo un problema al registrar el usuario' }),
      { status: 500 } // Error interno del servidor
    );
  }
}
