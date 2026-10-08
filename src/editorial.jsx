import { useRef } from 'react'
import { useParallax } from './motion.js'
import { Titulo } from './motion.jsx'

export function CabeceraSeccion({ numero, kicker, nota, children }) {
  return (
    <div>
      <div data-reveal="corte" className="flex items-center gap-4 border-t-2 border-[#4a151c] pt-4">
        {numero && (
          <span className="tabular font-serif text-lg font-semibold italic text-[#8a4a55]">{numero}</span>
        )}
        <span className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-[#8a5a52]">{kicker}</span>
        <span className="hidden h-px flex-1 bg-[#e3d2c7] md:block" />
        {nota && <span className="hidden text-xs italic text-[#8a5a52] md:block">{nota}</span>}
      </div>
      <Titulo className="mt-6 max-w-4xl font-serif text-[clamp(2.35rem,4.6vw,4.25rem)] font-semibold leading-[0.95] tracking-[-0.02em] text-[#4a151c]">
        {children}
      </Titulo>
    </div>
  )
}

export function Figura({ src, alt, numero, pie, className = '', imgClassName = '', tono = 'oscuro' }) {
  const claro = tono === 'claro'
  const ventana = useRef(null)
  useParallax(ventana)

  return (
    <figure className={className}>
      <div className={`border bg-white p-3 shadow-[0_26px_55px_-45px_rgba(74,21,28,0.65)] ${claro ? 'border-white/45' : 'border-[#e0cdc2]'}`}>
        <div ref={ventana} data-reveal="foto" className={`overflow-hidden bg-[#efe2d8] ${imgClassName}`}>
          <img src={src} alt={alt} className="h-full w-full object-cover" />
        </div>
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

const rutaGoogleMaps = 'https://www.google.com/maps/search/?api=1&query=Punto+Fijo+Falcón+Venezuela'

const halo = { paintOrder: 'stroke' }

const callesHorizontales = [
  { y: 64, h: 20 },
  { y: 196, h: 34 },
  { y: 336, h: 20 },
]

const callesVerticales = [
  { x: 56, w: 20 },
  { x: 214, w: 20 },
  { x: 392, w: 30 },
  { x: 556, w: 20 },
]

const edificios = [
  [8, 6, 40, 48],
  [86, 8, 56, 44],
  [150, 8, 54, 44],
  [244, 6, 64, 50],
  [316, 6, 66, 50],
  [432, 8, 54, 46],
  [494, 8, 52, 46],
  [586, 6, 46, 50],
  [8, 96, 38, 86],
  [244, 96, 60, 44],
  [312, 96, 70, 44],
  [244, 150, 138, 32],
  [432, 96, 56, 86],
  [496, 96, 50, 40],
  [496, 144, 50, 38],
  [586, 96, 46, 86],
  [8, 240, 38, 86],
  [244, 240, 56, 44],
  [316, 240, 66, 44],
  [432, 240, 54, 44],
  [494, 240, 52, 44],
  [586, 240, 46, 44],
  [8, 366, 40, 46],
  [86, 366, 54, 46],
  [150, 366, 54, 46],
  [244, 366, 64, 46],
  [316, 366, 66, 46],
  [432, 366, 54, 46],
  [494, 366, 52, 46],
  [586, 366, 46, 46],
]

const arboles = [
  [112, 120, 10],
  [180, 116, 8],
  [166, 152, 12],
  [108, 166, 7],
  [194, 166, 8],
]

const recorrido = 'M66 410 V360 Q66 346 80 346 H296 Q310 346 310 332 V300'

export function MapaUbicacion({ className = '' }) {
  return (
    <figure data-reveal="sube" className={className}>
      <div className="relative border border-[#4a151c] bg-white p-2 shadow-[0_26px_55px_-45px_rgba(74,21,28,0.65)] sm:p-3">
        <span aria-hidden="true" className="pointer-events-none absolute inset-1.5 border border-[#4a151c]/25" />
        <div data-reveal="trazo" className="relative overflow-hidden bg-[#e8eaed]">
          <svg
            viewBox="0 0 640 420"
            role="img"
            aria-label="Mapa esquemático de Punto Fijo con el atelier Siena Flower marcado y el recorrido hasta la puerta"
            className="block h-auto w-full"
          >
            <defs>
              <mask id="mapa-ruta" maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="420">
                <path
                  d={recorrido}
                  pathLength="1"
                  data-trazo
                  strokeDasharray="1"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="26"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </mask>
            </defs>

            <rect x="0" y="0" width="640" height="420" fill="#e8eaed" />

            <rect x="86" y="94" width="118" height="92" fill="#c8e6c9" />
            {arboles.map(([cx, cy, r]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="#a8d79a" />
            ))}
            <text x="145" y="180" textAnchor="middle" fontSize="13" fontWeight="600" fill="#3f7a4a" stroke="#ffffff" strokeWidth="3.5" style={halo}>
              Jardín
            </text>

            {edificios.map(([x, y, w, h]) => (
              <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx="2" fill="#dfe1e5" />
            ))}

            {callesHorizontales.map((calle) => (
              <rect key={`cs${calle.y}`} x="-2" y={calle.y - 2} width="644" height={calle.h + 4} fill="#dadce0" />
            ))}
            {callesVerticales.map((calle) => (
              <rect key={`cs${calle.x}`} x={calle.x - 2} y="-2" width={calle.w + 4} height="424" fill="#dadce0" />
            ))}
            {callesHorizontales.map((calle) => (
              <rect key={`c${calle.y}`} x="0" y={calle.y} width="640" height={calle.h} fill="#ffffff" />
            ))}
            {callesVerticales.map((calle) => (
              <rect key={`v${calle.x}`} x={calle.x} y="0" width={calle.w} height="420" fill="#ffffff" />
            ))}
            <path d="M0 213 H640" fill="none" stroke="#dadce0" strokeWidth="2" strokeDasharray="16 14" />
            <path d="M407 0 V420" fill="none" stroke="#dadce0" strokeWidth="2" strokeDasharray="16 14" />

            <g mask="url(#mapa-ruta)">
              <path d={recorrido} fill="none" stroke="#ffffff" strokeWidth="9" strokeDasharray="0.01 11" strokeLinecap="round" />
              <path d={recorrido} fill="none" stroke="#1a73e8" strokeWidth="4.5" strokeDasharray="0.01 11" strokeLinecap="round" />
              <circle cx="66" cy="410" r="6" fill="#1a73e8" stroke="#ffffff" strokeWidth="3" />
            </g>

            <g transform="translate(310 300)">
              <ellipse cx="0" cy="4" rx="12" ry="4.5" fill="#3c4043" opacity="0.3" />
              <g className="mapa-pin">
                <path
                  d="M0 0 C -7 -12 -17 -22 -17 -34 A 17 17 0 0 1 17 -34 C 17 -22 7 -12 0 0 Z"
                  fill="#ea4335"
                />
                <circle cx="0" cy="-34" r="7" fill="#ffffff" />
              </g>
            </g>

            <text x="334" y="262" fontSize="17" fontWeight="600" fill="#4a151c" stroke="#ffffff" strokeWidth="5" style={halo} className="font-serif italic">
              Siena Flower · Atelier
            </text>
            <text x="145" y="400" textAnchor="middle" fontSize="15" fontWeight="600" letterSpacing="1.5" fill="#5f6368" stroke="#ffffff" strokeWidth="4" style={halo}>
              Punto Fijo
            </text>

            <g aria-hidden="true">
              <rect x="596" y="336" width="30" height="58" fill="#ffffff" stroke="#dadce0" />
              <path d="M596 365 H626" stroke="#dadce0" />
              <text x="611" y="357" fontSize="17" fontWeight="600" fill="#3c4043" textAnchor="middle">+</text>
              <text x="611" y="386" fontSize="17" fontWeight="600" fill="#3c4043" textAnchor="middle">−</text>
            </g>
          </svg>
        </div>
      </div>
      <figcaption className="mt-3 flex items-baseline gap-3 text-sm italic leading-6 text-[#76574f]">
        <span className="shrink-0 text-[10px] font-extrabold uppercase not-italic tracking-[0.24em] text-[#8a5a52]">Fig. 4</span>
        <span>Plano esquemático de Punto Fijo: el recorrido punteado y el marcador son orientativos.</span>
      </figcaption>
    </figure>
  )
}

export function BotonComoLlegar({ className = '' }) {
  return (
    <a
      href={rutaGoogleMaps}
      target="_blank"
      rel="noopener noreferrer"
      className={`barrido-borde inline-flex items-center justify-center gap-3 border border-[#4a151c] bg-[#4a151c] px-7 py-4 text-xs font-extrabold uppercase tracking-[0.16em] text-white transition hover:-translate-y-0.5 hover:border-[#7f2432] hover:bg-[#7f2432] ${className}`}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="h-4 w-4" fill="currentColor">
        <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
      </svg>
      Cómo llegar
    </a>
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
      <svg viewBox="0 0 1200 64" className="h-16 w-full" fill="none" aria-hidden="true" focusable="false" data-reveal="trazo">
        <path d="M0 32H452M748 32H1200" stroke="#e3d2c7" strokeWidth="1" pathLength="1" data-trazo />
        <g stroke="#b9737f" strokeWidth="1.4" strokeLinecap="round">
          <path d="M452 32c58 0 108-3 148-13" pathLength="1" data-trazo />
          <path d="M452 32c58 0 108 3 148 13" pathLength="1" data-trazo />
          <path d="M748 32c-58 0-108-3-148-13" pathLength="1" data-trazo />
          <path d="M748 32c-58 0-108 3-148 13" pathLength="1" data-trazo />
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
              style={{ animationDelay: petalo.espera, transitionDelay: petalo.espera, '--giro': `${petalo.giro}deg` }}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
