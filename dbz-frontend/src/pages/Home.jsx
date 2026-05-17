import { useContext } from "react"
import { PersonajeContext } from "../context/PersonajeContext"
import PersonajeCard from "../components/PersonajeCard"

function Home() {
  const {
    personajes,
    personajeSeleccionado,
    setPersonajeSeleccionado,
    loading,
    paginaActual,
    setPaginaActual,
    totalPaginas,
  } = useContext(PersonajeContext)

  return (
    <div className="flex-1 p-6 text-white">
      <div className="flex gap-6">

        {/* Tabla */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-orange-400">Personajes</h2>
          </div>

          {loading ? (
            <p className="text-gray-400">Cargando...</p>
          ) : (
            <table className="w-full text-sm bg-gray-800 rounded-lg overflow-hidden">
              <thead className="bg-gray-700 text-gray-300">
                <tr>
                  <th className="px-4 py-2 text-left">#</th>
                  <th className="px-4 py-2 text-left">Nombre</th>
                  <th className="px-4 py-2 text-left">Raza</th>
                  <th className="px-4 py-2 text-left">Afiliación</th>
                  <th className="px-4 py-2 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {personajes.map((p) => (
                  <PersonajeCard key={p.id} personaje={p} />
                ))}
              </tbody>
            </table>
          )}

          {/* Paginación */}
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
              disabled={paginaActual === 1}
              className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded disabled:opacity-40 transition"
            >
              ← Anterior
            </button>
            <span className="text-gray-300 text-sm">
              Página {paginaActual} de {totalPaginas}
            </span>
            <button
              onClick={() => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))}
              disabled={paginaActual === totalPaginas}
              className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded disabled:opacity-40 transition"
            >
              Siguiente →
            </button>
          </div>
        </div>

        {/* Panel detalle */}
        {personajeSeleccionado && (
          <div className="w-64 bg-gray-800 rounded-lg p-4 flex flex-col gap-3">
            {personajeSeleccionado.image ? (
              <img
                src={personajeSeleccionado.image}
                alt={personajeSeleccionado.name}
                className="w-full h-56 object-contain bg-gray-700 rounded p-2"
              />
            ) : (
              <div className="w-full h-56 bg-gray-700 rounded flex items-center justify-center text-4xl">
                ⚡
              </div>
            )}

            <h3 className="font-bold text-lg text-orange-400">
              {personajeSeleccionado.name}
            </h3>

            <div className="border-t border-gray-600 pt-2 flex flex-col gap-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Raza</span>
                <span>{personajeSeleccionado.race || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Género</span>
                <span>{personajeSeleccionado.gender || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Afiliación</span>
                <span>{personajeSeleccionado.affiliation || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Ki base</span>
                <span>{personajeSeleccionado.ki || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Ki máximo</span>
                <span>{personajeSeleccionado.maxKi || "—"}</span>
              </div>
            </div>

            <button
              onClick={() => setPersonajeSeleccionado(null)}
              className="bg-gray-600 hover:bg-gray-500 py-2 rounded text-sm transition"
            >
              ✕ Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home