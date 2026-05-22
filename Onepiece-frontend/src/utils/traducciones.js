const ocupaciones = {
  Captain: "Capitán",
  Navigator: "Navegante",
  Cook: "Cocinero",
  Doctor: "Doctor",
  Swordsman: "Espadachín",
  Archaeologist: "Arqueóloga",
  Shipwright: "Carpintero",
  Musician: "Músico",
  Helmsman: "Timonel",
  "Right-hand man": "Brazo derecho",
  "Nami Arme": "Arma de Nami",
}

const estados = {
  living: "Vivo",
  vivant: "Vivo",
  dead: "Muerto",
  deceased: "Muerto",
}

export function traducirOcupacion(valor) {
  if (!valor || valor === "—") return "—"
  return ocupaciones[valor] || valor
}

export function traducirEstado(valor) {
  if (!valor || valor === "—") return "—"
  return estados[valor.toLowerCase()] || estados[valor] || valor
}

export function formatearRecompensa(valor) {
  if (!valor || valor === "—") return "—"
  return `฿ ${valor}`
}
