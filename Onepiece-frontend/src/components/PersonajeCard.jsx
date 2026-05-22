import { useContext } from "react"
import { PersonajeContext } from "../context/PersonajeContext"
import { traducirOcupacion } from "../utils/traducciones"

function PersonajeCard({ personaje }) {
  const { setPersonajeSeleccionado } = useContext(PersonajeContext)

  return (
    <tr>
      <td className="px-4 py-3 text-[#c9a227] font-semibold tabular-nums">
        #{personaje.id}
      </td>
      <td className="px-4 py-3 font-semibold text-[#f2e6c8]">{personaje.name}</td>
      <td className="px-4 py-3 text-[#dcc99a]">
        {traducirOcupacion(personaje.race)}
      </td>
      <td className="px-4 py-3">
        <span className="pirate-tag-crew inline-block px-2 py-1 rounded max-w-[180px] truncate">
          {personaje.affiliation || "—"}
        </span>
      </td>
      <td className="px-4 py-3 text-center">
        <button
          onClick={() => setPersonajeSeleccionado(personaje)}
          className="pirate-btn-action text-sm px-3 py-1.5 rounded transition"
        >
          Ver cartel
        </button>
      </td>
    </tr>
  )
}

export default PersonajeCard
