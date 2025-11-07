"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function CrearUsuarioPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    edad: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al crear el usuario");
      }

      setSuccess(true);
      setFormData({ nombre: "", apellido: "", edad: "" });

      // Redirigir a la página de usuarios después de 2 segundos
      setTimeout(() => {
        router.push("/usuarios");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-900 p-4">
      <main className="w-full max-w-2xl">
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-zinc-50">
            Crear Nuevo Usuario
          </h1>

          {success && (
            <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/20 border border-green-400 dark:border-green-800 text-green-700 dark:text-green-300 rounded-md">
              Usuario creado exitosamente. Redirigiendo...
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-300 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
              >
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100"
                placeholder="Ingresa el nombre"
              />
            </div>

            <div>
              <label
                htmlFor="apellido"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
              >
                Apellido
              </label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100"
                placeholder="Ingresa el apellido"
              />
            </div>

            <div>
              <label
                htmlFor="edad"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
              >
                Edad
              </label>
              <input
                type="number"
                id="edad"
                name="edad"
                value={formData.edad}
                onChange={handleChange}
                required
                min="1"
                max="150"
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100"
                placeholder="Ingresa la edad"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed font-medium"
              >
                {loading ? "Guardando..." : "Guardar Usuario"}
              </button>

              <button
                type="button"
                onClick={() => router.push("/usuarios")}
                className="flex-1 px-6 py-3 bg-zinc-500 text-white rounded-md hover:bg-zinc-600 transition-colors font-medium"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
