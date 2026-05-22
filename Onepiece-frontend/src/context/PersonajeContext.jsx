import { createContext, useState, useEffect } from "react"
import api from "../api/api"

export const PersonajeContext = createContext()

function normalizarPersonaje(personaje) {
  return {
    id: personaje.id,
    name: personaje.name,
    race: personaje.job || "—",
    gender: personaje.status || "—",
    affiliation: personaje.crew?.name || "—",
    ki: personaje.bounty || "—",
    maxKi: personaje.fruit?.name || "—",
    image: null,
    age: personaje.age || "—",
    size: personaje.size || "—",
  }
}

export function PersonajeProvider({ children }) {
  const [personajes, setPersonajes] = useState([])
  const [todosPersonajes, setTodosPersonajes] = useState([])
  const [personajeSeleccionado, setPersonajeSeleccionado] = useState(null)
  const [loading, setLoading] = useState(false)
  const [filtroNombre, setFiltroNombre] = useState("")
  const [filtroRaza, setFiltroRaza] = useState("")
  const [filtroAfiliacion, setFiltroAfiliacion] = useState("")
  const [ordering, setOrdering] = useState("")
  const [paginaActual, setPaginaActual] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)
  const pageSize = 3

  const aplicarFiltrosOrdenYPagina = (lista, pagina) => {
    let resultados = [...lista]

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
      resultados.sort((a, b) => a.name.localeCompare(b.name))
    } else if (ordering === "nombre_desc") {
      resultados.sort((a, b) => b.name.localeCompare(a.name))
    } else if (ordering === "id_asc") {
      resultados.sort((a, b) => a.id - b.id)
    } else if (ordering === "id_desc") {
      resultados.sort((a, b) => b.id - a.id)
    }

    const total = Math.max(1, Math.ceil(resultados.length / pageSize))
    const paginaSegura = Math.min(Math.max(pagina, 1), total)
    const inicio = (paginaSegura - 1) * pageSize

    return {
      pagina: paginaSegura,
      total,
      paginados: resultados.slice(inicio, inicio + pageSize),
    }
  }

  const cargarPersonajes = async (paginaOverride) => {
    setLoading(true)
    try {
      let lista = todosPersonajes

      if (lista.length === 0) {
        const response = await api.get("/characters/en")
        const data = Array.isArray(response.data) ? response.data : []
        lista = data.map(normalizarPersonaje)
        setTodosPersonajes(lista)
      }

      const paginaConsulta = paginaOverride ?? paginaActual
      const { pagina, total, paginados } = aplicarFiltrosOrdenYPagina(
        lista,
        paginaConsulta
      )

      if (pagina !== paginaActual) {
        setPaginaActual(pagina)
      }

      setPersonajes(paginados)
      setTotalPaginas(total)
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
