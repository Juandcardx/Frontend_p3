import axios from "axios"

const cacheImagenes = new Map()

export async function obtenerImagenPersonaje(nombre) {
  const clave = nombre.toLowerCase().trim()
  if (cacheImagenes.has(clave)) {
    return cacheImagenes.get(clave)
  }

  try {
    const { data } = await axios.get("https://api.jikan.moe/v4/characters", {
      params: { q: nombre, limit: 8 },
    })

    const candidatos = (data.data || []).filter((c) =>
      c.images?.jpg?.image_url?.includes("cdn.myanimelist.net")
    )

    const exacto = candidatos.find(
      (c) => c.name.toLowerCase() === clave
    )
    const url = (exacto || candidatos[0])?.images?.jpg?.image_url || null

    cacheImagenes.set(clave, url)
    return url
  } catch (error) {
    console.error("Error cargando imagen del personaje:", error)
    cacheImagenes.set(clave, null)
    return null
  }
}
