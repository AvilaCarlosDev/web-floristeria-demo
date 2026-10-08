export function CabeceraSeccion({ numero, kicker, nota, children }) {
  return (
    <div>
      <div className="flex items-center gap-4 border-t-2 border-[#4a151c] pt-4">
        {numero && (
          <span className="tabular font-serif text-lg font-semibold italic text-[#8a4a55]">{numero}</span>
        )}
        <span className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-[#8a5a52]">{kicker}</span>
        <span className="hidden h-px flex-1 bg-[#e3d2c7] md:block" />
        {nota && <span className="hidden text-xs italic text-[#8a5a52] md:block">{nota}</span>}
      </div>
      <h2 className="mt-6 max-w-4xl font-serif text-[clamp(2.35rem,4.6vw,4.25rem)] font-semibold leading-[0.95] tracking-[-0.02em] text-[#4a151c]">
        {children}
      </h2>
    </div>
  )
}

export function Figura({ src, alt, numero, pie, className = '', imgClassName = '', tono = 'oscuro' }) {
  const claro = tono === 'claro'

  return (
    <figure className={className}>
      <div className={`border bg-white p-3 shadow-[0_26px_55px_-45px_rgba(74,21,28,0.65)] ${claro ? 'border-white/45' : 'border-[#e0cdc2]'}`}>
        <img src={src} alt={alt} className={`w-full object-cover ${imgClassName}`} />
      </div>
      <figcaption className={`mt-3 flex items-baseline gap-3 text-sm italic leading-6 ${claro ? 'text-white/75' : 'text-[#76574f]'}`}>
        <span className={`shrink-0 text-[10px] font-extrabold uppercase not-italic tracking-[0.24em] ${claro ? 'text-[#f8d8c4]' : 'text-[#8a5a52]'}`}>
          {numero}
        </span>
        <span>{pie}</span>
      </figcaption>
    </figure>
  )
}

export function DivisorPetalos() {
  const petalos = [
    { cx: 140, cy: 32, rx: 9, ry: 5, giro: -20, espera: '0s' },
    { cx: 285, cy: 32, rx: 7, ry: 4, giro: 16, espera: '1.1s' },
    { cx: 395, cy: 32, rx: 8, ry: 4.5, giro: -12, espera: '2.2s' },
    { cx: 805, cy: 32, rx: 8, ry: 4.5, giro: 18, espera: '0.6s' },
    { cx: 915, cy: 32, rx: 7, ry: 4, giro: -16, espera: '1.7s' },
    { cx: 1060, cy: 32, rx: 9, ry: 5, giro: 22, espera: '2.8s' },
  ]

  return (
    <div className="mx-auto w-full max-w-[100rem] px-5 py-7 lg:px-10">
      <svg viewBox="0 0 1200 64" className="h-16 w-full" fill="none" aria-hidden="true" focusable="false">
        <path d="M0 32H452M748 32H1200" stroke="#e3d2c7" strokeWidth="1" />
        <g stroke="#b9737f" strokeWidth="1.4" strokeLinecap="round">
          <path d="M452 32c58 0 108-3 148-13" />
          <path d="M452 32c58 0 108 3 148 13" />
          <path d="M748 32c-58 0-108-3-148-13" />
          <path d="M748 32c-58 0-108 3-148 13" />
        </g>
        <g fill="#f1d6c8" stroke="#b9737f" strokeWidth="1.2">
          <ellipse cx="500" cy="24" rx="9" ry="5" transform="rotate(-24 500 24)" />
          <ellipse cx="500" cy="40" rx="9" ry="5" transform="rotate(24 500 40)" />
          <ellipse cx="556" cy="17" rx="9" ry="5" transform="rotate(-16 556 17)" />
          <ellipse cx="556" cy="47" rx="9" ry="5" transform="rotate(16 556 47)" />
          <ellipse cx="700" cy="24" rx="9" ry="5" transform="rotate(24 700 24)" />
          <ellipse cx="700" cy="40" rx="9" ry="5" transform="rotate(-24 700 40)" />
          <ellipse cx="644" cy="17" rx="9" ry="5" transform="rotate(16 644 17)" />
          <ellipse cx="644" cy="47" rx="9" ry="5" transform="rotate(-16 644 47)" />
        </g>
        <circle cx="600" cy="32" r="10" fill="#fbf4ed" stroke="#4a151c" strokeWidth="1.6" />
        <circle cx="600" cy="32" r="3.5" fill="#4a151c" />
        <g fill="#e8b7ad" stroke="#b9737f" strokeWidth="1">
          {petalos.map((petalo) => (
            <ellipse
              key={`${petalo.cx}-${petalo.cy}`}
              className="petalo"
              cx={petalo.cx}
              cy={petalo.cy}
              rx={petalo.rx}
              ry={petalo.ry}
              style={{ animationDelay: petalo.espera, '--giro': `${petalo.giro}deg` }}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
