import { useContext } from "react"
import { PersonajeContext } from "../context/PersonajeContext"

function Sidebar() {
  const {
    filtroNombre,
    setFiltroNombre,
    filtroRaza,
    setFiltroRaza,
    filtroAfiliacion,
    setFiltroAfiliacion,
    ordering,
    setOrdering,
    cargarPersonajes,
    setPaginaActual,
  } = useContext(PersonajeContext)

  const handleBuscar = () => {
    setPaginaActual(1)
    cargarPersonajes(1)
  }

  const handleLimpiar = () => {
    setFiltroNombre("")
    setFiltroRaza("")
    setFiltroAfiliacion("")
    setOrdering("")
    setPaginaActual(1)
    cargarPersonajes(1)
  }

  return (
    <aside className="pirate-sidebar w-64 text-[#f2e6c8] p-5 flex flex-col gap-4 min-h-full shrink-0 z-10">
      <h2 className="text-[#ffd95a] text-xl tracking-wide border-b-2 border-[#8b6914] pb-2 flex items-center gap-2">
        <span aria-hidden>🧭</span> Filtros de búsqueda
      </h2>

      <p className="text-xs text-[#dcc99aaa] italic -mt-2">
        Rastrea piratas en los mares del Grand Line
      </p>

      <div className="flex flex-col gap-1">
        <label className="text-[#dcc99a] text-sm font-semibold">Nombre</label>
        <input
          type="text"
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
          placeholder="Ej: Luffy"
          className="pirate-input px-3 py-2 text-sm w-full"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[#dcc99a] text-sm font-semibold">Ocupación</label>
        <select
          value={filtroRaza}
          onChange={(e) => setFiltroRaza(e.target.value)}
          className="pirate-input px-3 py-2 text-sm w-full"
        >
          <option value="">Todas</option>
          <option value="Captain">Capitán</option>
          <option value="Navigator">Navegante</option>
          <option value="Cook">Cocinero</option>
          <option value="Doctor">Doctor</option>
          <option value="Swordsman">Espadachín</option>
          <option value="Archaeologist">Arqueóloga</option>
          <option value="Shipwright">Carpintero</option>
          <option value="Musician">Músico</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[#dcc99a] text-sm font-semibold">Tripulación</label>
        <select
          value={filtroAfiliacion}
          onChange={(e) => setFiltroAfiliacion(e.target.value)}
          className="pirate-input px-3 py-2 text-sm w-full"
        >
          <option value="">Todas</option>
          <option value="Chapeau de Paille">Sombrero de Paja</option>
          <option value="Marine">Marines</option>
          <option value="Baroque Works">Baroque Works</option>
          <option value="Whitebeard">Barbablanca</option>
          <option value="Big Mom">Big Mom</option>
          <option value="Roger">Piratas de Roger</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[#dcc99a] text-sm font-semibold">Ordenar por</label>
        <select
          value={ordering}
          onChange={(e) => setOrdering(e.target.value)}
          className="pirate-input px-3 py-2 text-sm w-full"
        >
          <option value="">Sin orden</option>
          <option value="nombre_asc">Nombre A-Z</option>
          <option value="nombre_desc">Nombre Z-A</option>
          <option value="id_asc">ID ↑</option>
          <option value="id_desc">ID ↓</option>
        </select>
      </div>

      <button
        onClick={handleBuscar}
        className="pirate-btn-gold py-2.5 rounded text-lg mt-1"
      >
        ⚔ Buscar
      </button>
      <button
        onClick={handleLimpiar}
        className="pirate-btn-wood py-2 rounded text-sm"
      >
        Limpiar filtros
      </button>

      <div className="mt-auto pt-4 border-t border-[#8b691444] text-center text-2xl opacity-40">
        ☠ ⚓ ☠
      </div>
    </aside>
  )
}

export default Sidebar
