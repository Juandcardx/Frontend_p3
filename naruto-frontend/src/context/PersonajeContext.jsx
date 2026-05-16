import { createContext, useState, useEffect } from "react"
import api from "../api/api"

export const PersonajeContext = createContext()

export function PersonajeProvider({ children }) {
  const [personajes, setPersonajes] = useState([])
  const [personajeSeleccionado, setPersonajeSeleccionado] = useState(null)
  const [loading, setLoading] = useState(false)

  // Filtros y ordenamiento
  const [filtros, setFiltros] = useState({
    nombre_personaje: "",
    aldea: "",
    rango: "",
  })
  const [ordering, setOrdering] = useState("")

  // Paginación
  const [paginaActual, setPaginaActual] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)
  const [pageSize, setPageSize] = useState(3)

  const cargarPersonajes = async () => {
    setLoading(true)
    try {
      const params = {
        page: paginaActual,
        page_size: pageSize,
      }
      if (filtros.nombre_personaje) params.nombre_personaje = filtros.nombre_personaje
      if (filtros.aldea) params.aldea = filtros.aldea
      if (filtros.rango) params.rango = filtros.rango
      if (ordering) params.ordering = ordering

      const response = await api.get("/personajes/", { params })
      setPersonajes(response.data.results)
      setTotalPaginas(Math.ceil(response.data.count / pageSize))
    } catch (error) {
      console.error("Error cargando personajes:", error)
    } finally {
      setLoading(false)
    }
  }

  const eliminarPersonaje = async (id) => {
    await api.delete(`/personajes/${id}/`)
    if (personajeSeleccionado?.id === id) setPersonajeSeleccionado(null)
    cargarPersonajes()
  }

  const crearPersonaje = async (formData) => {
    await api.post("/personajes/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    cargarPersonajes()
  }

  const editarPersonaje = async (id, formData) => {
    await api.put(`/personajes/${id}/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    cargarPersonajes()
  }

  useEffect(() => {
    cargarPersonajes()
  }, [paginaActual, pageSize, ordering])

  return (
    <PersonajeContext.Provider
      value={{
        personajes,
        personajeSeleccionado,
        setPersonajeSeleccionado,
        loading,
        filtros,
        setFiltros,
        ordering,
        setOrdering,
        paginaActual,
        setPaginaActual,
        totalPaginas,
        pageSize,
        setPageSize,
        cargarPersonajes,
        eliminarPersonaje,
        crearPersonaje,
        editarPersonaje,
      }}
    >
      {children}
    </PersonajeContext.Provider>
  )
}