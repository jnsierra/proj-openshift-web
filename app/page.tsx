import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-900 p-4">
      <main className="w-full max-w-4xl">
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-12 text-center">
          <h1 className="text-4xl font-bold mb-6 text-zinc-900 dark:text-zinc-50">
            Bienvenido al Sistema de Usuarios
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
            Gestiona usuarios de forma sencilla y eficiente
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <Link
              href="/usuarios"
              className="block p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors border-2 border-blue-200 dark:border-blue-800"
            >
              <h2 className="text-2xl font-semibold text-blue-900 dark:text-blue-300 mb-3">
                Consultar Usuarios
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                Ve la lista completa de usuarios registrados
              </p>
            </Link>

            <Link
              href="/usuarios/crear"
              className="block p-6 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors border-2 border-green-200 dark:border-green-800"
            >
              <h2 className="text-2xl font-semibold text-green-900 dark:text-green-300 mb-3">
                Crear Usuario
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                Agrega un nuevo usuario al sistema
              </p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
