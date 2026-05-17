import { createContext, useState, useEffect } from "react"
import api from "../api/api"

export const PersonajeContext = createContext()

export function PersonajeProvider({ children }) {
  const [personajes, setPersonajes] = useState([])
  const [personajeSeleccionado, setPersonajeSeleccionado] = useState(null)
  const [loading, setLoading] = useState(false)
  const [filtroNombre, setFiltroNombre] = useState("")
  const [filtroRaza, setFiltroRaza] = useState("")
  const [filtroAfiliacion, setFiltroAfiliacion] = useState("")
  const [ordering, setOrdering] = useState("")
  const [paginaActual, setPaginaActual] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)
  const pageSize = 3

  const cargarPersonajes = async () => {
    setLoading(true)
    try {
      const response = await api.get("/characters", {
        params: {
          page: paginaActual,
          limit: pageSize,
        },
      })

      let resultados = response.data.items || []

      if (filtroNombre) {
        resultados = resultados.filter((p) =>
          p.name.toLowerCase().includes(filtroNombre.toLowerCase())
        )
      }
      if (filtroRaza) {
        resultados = resultados.filter((p) =>
          p.race?.toLowerCase().includes(filtroRaza.toLowerCase())
        )
      }
      if (filtroAfiliacion) {
        resultados = resultados.filter((p) =>
          p.affiliation?.toLowerCase().includes(filtroAfiliacion.toLowerCase())
        )
      }

      if (ordering === "nombre_asc") {
        resultados = [...resultados].sort((a, b) => a.name.localeCompare(b.name))
      } else if (ordering === "nombre_desc") {
        resultados = [...resultados].sort((a, b) => b.name.localeCompare(a.name))
      } else if (ordering === "id_asc") {
        resultados = [...resultados].sort((a, b) => a.id - b.id)
      } else if (ordering === "id_desc") {
        resultados = [...resultados].sort((a, b) => b.id - a.id)
      }

      setPersonajes(resultados)
      setTotalPaginas(response.data.meta?.totalPages || 1)
    } catch (error) {
      console.error("Error cargando personajes:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    cargarPersonajes()
  }, [paginaActual, ordering])

  return (
    <PersonajeContext.Provider
      value={{
        personajes,
        personajeSeleccionado,
        setPersonajeSeleccionado,
        loading,
        filtroNombre,
        setFiltroNombre,
        filtroRaza,
        setFiltroRaza,
        filtroAfiliacion,
        setFiltroAfiliacion,
        ordering,
        setOrdering,
        paginaActual,
        setPaginaActual,
        totalPaginas,
        pageSize,
        cargarPersonajes,
      }}
    >
      {children}
    </PersonajeContext.Provider>
  )
}