import { NextResponse } from "next/server";

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  edad: number;
}

// URL del backend externo
const BACKEND_URL = "http://localhost:8080/api/personas";

// GET - Obtener todos los usuarios desde el backend externo
export async function GET() {
  try {
    const response = await fetch(BACKEND_URL);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Error al obtener usuarios del backend" },
        { status: response.status }
      );
    }

    const usuarios = await response.json();
    return NextResponse.json(usuarios);
  } catch (error) {
    console.error("Error al conectar con el backend:", error);
    return NextResponse.json(
      { error: "No se pudo conectar con el servidor backend" },
      { status: 500 }
    );
  }
}

// POST - Crear un nuevo usuario en el backend externo
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

    // Enviar la petición al backend externo (sin ID, se genera en el backend)
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: body.nombre,
        apellido: body.apellido,
        edad: parseInt(body.edad)
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.error || "Error al crear el usuario en el backend" },
        { status: response.status }
      );
    }

    const nuevoUsuario = await response.json();
    return NextResponse.json(nuevoUsuario, { status: 201 });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return NextResponse.json(
      { error: "No se pudo conectar con el servidor backend" },
      { status: 500 }
    );
  }
}
