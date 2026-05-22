function Navbar() {
  return (
    <header>
      <div className="rope-border-top" />
      <nav className="pirate-navbar text-[#f2e6c8] px-6 py-4 flex items-center gap-4">
        <div className="flex items-center gap-3">
          <span
            className="text-3xl drop-shadow-lg"
            role="img"
            aria-label="Bandera pirata"
          >
            🏴‍☠️
          </span>
          <div>
            <h1 className="pirate-title text-2xl md:text-3xl text-[#ffd95a] leading-tight">
              Grand Line — Archivo Pirata
            </h1>
            <p className="text-xs text-[#c9a22799] tracking-widest uppercase mt-0.5">
              ⚓ Registro de recompensas · One Piece
            </p>
          </div>
        </div>
        <span className="text-[#dcc99a99] text-sm ml-auto hidden sm:inline italic">
          Programación en la Web — 2026-I
        </span>
      </nav>
      <div className="rope-border-top opacity-60" />
    </header>
  )
}

export default Navbar
