import { useContext } from "react"
import { PersonajeContext } from "../context/PersonajeContext"

function PersonajeCard({ personaje }) {
  const { setPersonajeSeleccionado } = useContext(PersonajeContext)

  return (
    <tr className="border-b border-gray-700 hover:bg-gray-700 transition">
      <td className="px-4 py-2 text-gray-400">{personaje.id}</td>
      <td className="px-4 py-2 font-medium">{personaje.name}</td>
      <td className="px-4 py-2 text-gray-300">{personaje.race || "—"}</td>
      <td className="px-4 py-2">
        <span className="bg-orange-900 text-orange-300 text-xs px-2 py-1 rounded">
          {personaje.affiliation || "—"}
        </span>
      </td>
      <td className="px-4 py-2 text-center">
        <button
          onClick={() => setPersonajeSeleccionado(personaje)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded transition"
        >
          Ver
        </button>
      </td>
    </tr>
  )
}

export default PersonajeCard