import { useContext, useEffect, useState } from "react"
import { PersonajeContext } from "../context/PersonajeContext"
import PersonajeCard from "../components/PersonajeCard"
import { obtenerImagenPersonaje } from "../api/imagenes"
import {
  traducirOcupacion,
  traducirEstado,
  formatearRecompensa,
} from "../utils/traducciones"

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

  const [imagenPersonaje, setImagenPersonaje] = useState(null)
  const [cargandoImagen, setCargandoImagen] = useState(false)

  useEffect(() => {
    if (!personajeSeleccionado) {
      setImagenPersonaje(null)
      return
    }

    let cancelado = false
    setCargandoImagen(true)
    setImagenPersonaje(null)

    obtenerImagenPersonaje(personajeSeleccionado.name)
      .then((url) => {
        if (!cancelado) setImagenPersonaje(url)
      })
      .finally(() => {
        if (!cancelado) setCargandoImagen(false)
      })

    return () => {
      cancelado = true
    }
  }, [personajeSeleccionado])

  return (
    <main className="flex-1 p-6 z-10">
      <div className="flex gap-6 flex-wrap lg:flex-nowrap">
        <section className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl" aria-hidden>
              📜
            </span>
            <div>
              <h2 className="pirate-title text-2xl text-[#ffd95a]">
                Libro de recompensas
              </h2>
              <p className="text-sm text-[#dcc99a88] italic">
                Piratas registrados en el Grand Line
              </p>
            </div>
          </div>

          {loading ? (
            <p className="pirate-loading text-lg animate-pulse">
              ⚓ Consultando el archipiélago...
            </p>
          ) : personajes.length === 0 ? (
            <p className="text-[#dcc99a] italic">
              No hay piratas en esta página. Prueba otros filtros.
            </p>
          ) : (
            <div className="pirate-table-wrap">
              <table className="pirate-table w-full text-sm">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left">#</th>
                    <th className="px-4 py-3 text-left">Nombre</th>
                    <th className="px-4 py-3 text-left">Ocupación</th>
                    <th className="px-4 py-3 text-left">Tripulación</th>
                    <th className="px-4 py-3 text-center">Cartel</th>
                  </tr>
                </thead>
                <tbody>
                  {personajes.map((p) => (
                    <PersonajeCard key={p.id} personaje={p} />
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="pirate-pagination flex items-center gap-3 mt-5">
            <button
              onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
              disabled={paginaActual === 1}
              className="pirate-btn-wood px-4 py-2 rounded text-sm"
            >
              ← Anterior
            </button>
            <span className="text-[#ffd95a] text-sm font-semibold tracking-wide">
              Página {paginaActual} de {totalPaginas}
            </span>
            <button
              onClick={() =>
                setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))
              }
              disabled={paginaActual === totalPaginas}
              className="pirate-btn-wood px-4 py-2 rounded text-sm"
            >
              Siguiente →
            </button>
          </div>
        </section>

        {personajeSeleccionado && (
          <aside className="w-72 shrink-0 wanted-poster wanted-poster-animate p-4 flex flex-col gap-2 rotate-[0.5deg]">
            <p className="wanted-header">SE BUSCA</p>
            <p className="wanted-sub">MUERTO O VIVO</p>

            {cargandoImagen ? (
              <div className="w-full h-52 bg-[#dcc99a66] border-2 border-[#8b6914] flex items-center justify-center text-sm text-[#5c4030] italic">
                Dibujando retrato...
              </div>
            ) : imagenPersonaje ? (
              <img
                src={imagenPersonaje}
                alt={personajeSeleccionado.name}
                className="w-full h-52 object-cover border-4 border-[#2c1810] grayscale-[15%] contrast-110"
              />
            ) : (
              <div className="w-full h-52 bg-[#dcc99a66] border-4 border-dashed border-[#8b6914] flex flex-col items-center justify-center gap-2">
                <span className="text-5xl opacity-60">☠</span>
                <span className="text-xs text-[#5c4030] italic text-center px-2">
                  Retrato no disponible
                </span>
              </div>
            )}

            <h3 className="pirate-title text-xl text-center text-[#2c1810] leading-tight mt-1">
              {personajeSeleccionado.name}
            </h3>

            <div className="wanted-bounty">
              {formatearRecompensa(personajeSeleccionado.ki)}
            </div>

            <div className="mt-2 flex flex-col gap-0.5">
              <div className="wanted-stat">
                <span>Ocupación</span>
                <span>{traducirOcupacion(personajeSeleccionado.race)}</span>
              </div>
              <div className="wanted-stat">
                <span>Estado</span>
                <span>{traducirEstado(personajeSeleccionado.gender)}</span>
              </div>
              <div className="wanted-stat">
                <span>Tripulación</span>
                <span className="text-right max-w-[58%] text-xs leading-tight">
                  {personajeSeleccionado.affiliation || "—"}
                </span>
              </div>
              <div className="wanted-stat">
                <span>Fruta del diablo</span>
                <span className="text-right max-w-[58%] text-xs leading-tight">
                  {personajeSeleccionado.maxKi || "Ninguna"}
                </span>
              </div>
              <div className="wanted-stat">
                <span>Edad</span>
                <span>{personajeSeleccionado.age || "—"}</span>
              </div>
              <div className="wanted-stat">
                <span>Talla</span>
                <span>{personajeSeleccionado.size || "—"}</span>
              </div>
            </div>

            <p className="text-[10px] text-center text-[#5c4030aa] mt-1 tracking-widest">
              — MARINE HQ —
            </p>

            <button
              onClick={() => setPersonajeSeleccionado(null)}
              className="pirate-btn-wood py-2 rounded text-sm mt-1"
            >
              ✕ Cerrar cartel
            </button>
          </aside>
        )}
      </div>
    </main>
  )
}

export default Home
