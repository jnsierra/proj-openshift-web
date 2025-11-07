"use client";

import { useEffect, useState } from "react";
import { Usuario } from "../api/usuarios/route";

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/usuarios");
      if (!response.ok) {
        throw new Error("Error al cargar usuarios");
      }
      const data = await response.json();
      setUsuarios(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-900 p-4">
        <div className="text-zinc-600 dark:text-zinc-400">Cargando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-900 p-4">
        <div className="text-red-600 dark:text-red-400">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-900 p-4">
      <main className="w-full max-w-4xl">
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              Consulta de Usuarios
            </h1>
            <button
              onClick={fetchUsuarios}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Actualizar
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
              <thead className="bg-zinc-100 dark:bg-zinc-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                    Apellido
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                    Edad
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-700">
                {usuarios.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-4 text-center text-sm text-zinc-500 dark:text-zinc-400"
                    >
                      No hay usuarios registrados
                    </td>
                  </tr>
                ) : (
                  usuarios.map((usuario) => (
                    <tr
                      key={usuario.id}
                      className="hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-100">
                        {usuario.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-100">
                        {usuario.nombre}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-100">
                        {usuario.apellido}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-100">
                        {usuario.edad}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-zinc-100 dark:bg-zinc-700 rounded-md">
            <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
              Total de registros: {usuarios.length}
            </h2>
          </div>
        </div>
      </main>
    </div>
  );
}
