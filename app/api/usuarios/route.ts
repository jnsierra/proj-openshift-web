import { NextResponse } from "next/server";

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  edad: number;
}

// Simulamos una base de datos en memoria
let usuarios: Usuario[] = [
  {
    id: 1,
    nombre: "Jesus",
    apellido: "Sierra",
    edad: 34
  }
];

// GET - Obtener todos los usuarios
export async function GET() {
  return NextResponse.json(usuarios);
}

// POST - Crear un nuevo usuario
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validación básica
    if (!body.nombre || !body.apellido || !body.edad) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    // Crear nuevo usuario con ID autoincrementado
    const nuevoUsuario: Usuario = {
      id: usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1,
      nombre: body.nombre,
      apellido: body.apellido,
      edad: parseInt(body.edad)
    };

    usuarios.push(nuevoUsuario);

    return NextResponse.json(nuevoUsuario, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al crear el usuario" },
      { status: 500 }
    );
  }
}
