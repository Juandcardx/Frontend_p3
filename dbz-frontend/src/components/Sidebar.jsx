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
    cargarPersonajes()
  }

  const handleLimpiar = () => {
    setFiltroNombre("")
    setFiltroRaza("")
    setFiltroAfiliacion("")
    setOrdering("")
    setPaginaActual(1)
    cargarPersonajes()
  }

  return (
    <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col gap-4 min-h-screen">
      <h2 className="text-orange-400 font-bold text-lg border-b border-gray-600 pb-2">
         Filtros
      </h2>

      <div className="flex flex-col gap-1">
        <label className="text-gray-300 text-sm">Nombre</label>
        <input
          type="text"
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
          placeholder="Ej: Goku"
          className="bg-gray-700 text-white px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-gray-300 text-sm">Raza</label>
        <select
          value={filtroRaza}
          onChange={(e) => setFiltroRaza(e.target.value)}
          className="bg-gray-700 text-white px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="">Todas</option>
          <option value="Saiyan">Saiyan</option>
          <option value="Human">Human</option>
          <option value="Namekian">Namekian</option>
          <option value="Frieza Race">Frieza Race</option>
          <option value="Android">Android</option>
          <option value="Majin">Majin</option>
          <option value="God">God</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-gray-300 text-sm">Afiliación</label>
        <select
          value={filtroAfiliacion}
          onChange={(e) => setFiltroAfiliacion(e.target.value)}
          className="bg-gray-700 text-white px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="">Todas</option>
          <option value="Z Fighter">Z Fighter</option>
          <option value="Army of Frieza">Army of Frieza</option>
          <option value="Red Ribbon Army">Red Ribbon Army</option>
          <option value="Namekian Warrior">Namekian Warrior</option>
          <option value="Freelancer">Freelancer</option>
          <option value="Gods">Gods</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-gray-300 text-sm">Ordenar por</label>
        <select
          value={ordering}
          onChange={(e) => setOrdering(e.target.value)}
          className="bg-gray-700 text-white px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
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
        className="bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-semibold transition"
      >
        Buscar
      </button>
      <button
        onClick={handleLimpiar}
        className="bg-gray-600 hover:bg-gray-500 text-white py-2 rounded font-semibold transition"
      >
        Limpiar
      </button>
    </aside>
  )
}

export default Sidebar