import { useMemo, useState } from 'react'
import { MenuMovil, SaltarAlContenido, WhatsAppFlotante } from './sitio.jsx'
import { useSeccionActiva, wa } from './navegacion.js'
import { useRevelados } from './motion.js'
import { CabeceraSeccion, DivisorPetalos, Figura } from './editorial.jsx'
import { Contador, Titulo } from './motion.jsx'

const enlaces = [
  ['catalogo', 'Catálogo'],
  ['servicios', 'Servicios'],
  ['atelier', 'Atelier'],
  ['resenas', 'Reseñas'],
  ['pedido', 'Pedido a medida'],
]

const presupuestos = ['Hasta $40', '$40 – $70', '$70 – $120', 'Más de $120']

const occasions = ['Todos', 'Amor', 'Cumpleaños', 'Eventos', 'Condolencias', 'Detalle']

const arrangements = [
  {
    name: 'Ramo Siena Signature',
    occasion: 'Amor',
    price: 48,
    image: '/img/bouquet.jpg',
    note: 'Rosas premium, eucalipto y envoltorio artesanal',
    tag: 'Más pedido',
  },
  {
    name: 'Caja Rosé de Autor',
    occasion: 'Cumpleaños',
    price: 62,
    image: '/img/foto-15260479322733.jpg',
    note: 'Caja floral con tonos rosados, tarjeta y lazo satinado',
  },
  {
    name: 'Orquídea Blanca Serena',
    occasion: 'Condolencias',
    price: 74,
    image: '/img/foto-15181992667915.jpg',
    note: 'Diseño sobrio para mensajes de respeto y acompañamiento',
  },
  {
    name: 'Mesa Jardín Íntimo',
    occasion: 'Eventos',
    price: 120,
    image: '/img/garden-table.jpg',
    note: 'Centro de mesa para cenas, bodas civiles y celebraciones',
    tag: 'Eventos',
  },
  {
    name: 'Girasoles Al Alba',
    occasion: 'Detalle',
    price: 39,
    image: '/img/foto-1597848212624a.jpg',
    note: 'Alegre, luminoso y perfecto para levantar el día',
  },
  {
    name: 'Desayuno Amor Bonito',
    occasion: 'Amor',
    price: 58,
    image: '/img/foto-15068067322593.jpg',
    note: 'Flores, dulces, bebida, tarjeta personalizada y empaque premium',
  },
]

const services = [
  {
    title: 'Ramos personalizados',
    desc: 'Diseños según ocasión, color favorito y mensaje que quieras expresar.',
    image: '/img/foto-14907509678688.jpg',
  },
  {
    title: 'Eventos íntimos',
    desc: 'Mesas, rincones florales, bodas civiles, cumpleaños y cenas especiales.',
    image: '/img/foto-15192254219807.jpg',
  },
  {
    title: 'Entregas sorpresa',
    desc: 'Coordinamos horario, dedicatoria, evidencia de entrega y presentación impecable.',
    image: '/img/foto-1487070183336b.jpg',
  },
]

const moments = [
  ['08:00 AM', 'Corte fresco y selección de flores'],
  ['11:30 AM', 'Armado de pedidos personalizados'],
  ['02:00 PM', 'Salida de entregas del mismo día'],
  ['06:00 PM', 'Últimos detalles para eventos y sorpresas'],
]

const reviews = [
  {
    name: 'Valentina Márquez',
    text: 'Pedí un ramo para mi mamá y parecía salido de una revista. Llegó puntual y con una tarjeta preciosa.',
    image: '/img/foto-1494790108377b.jpg',
  },
  {
    name: 'Andrea Salas',
    text: 'Siena Flower decoró mi boda civil. Todo fue delicado, elegante y exactamente como lo imaginé.',
    image: '/img/foto-15345287417755.jpg',
  },
  {
    name: 'Miguel Torres',
    text: 'Me ayudaron a elegir flores para aniversario. La atención por WhatsApp fue rápida y muy cuidadosa.',
    image: '/img/foto-15006487677910.jpg',
  },
]

const cifras = [
  { valor: 10, sufijo: ' años', etiqueta: 'de atelier' },
  { valor: 1800, prefijo: '+', etiqueta: 'entregas realizadas' },
  { valor: 24, sufijo: ' h', etiqueta: 'por encargo' },
  { valor: 4.9, decimales: 1, sufijo: ' / 5', etiqueta: 'en reseñas' },
]

const folio = (indice) => String(indice + 1).padStart(2, '0')

function App() {
  const [activeOccasion, setActiveOccasion] = useState('Todos')
  const [favorites, setFavorites] = useState([])

  useRevelados()

  const filteredArrangements = useMemo(() => {
    if (activeOccasion === 'Todos') return arrangements
    return arrangements.filter((item) => item.occasion === activeOccasion)
  }, [activeOccasion])

  const activa = useSeccionActiva(enlaces.map(([id]) => id))
  const [encargo, setEncargo] = useState({ ocasion: 'Cumpleaños', para: '', colores: '', presupuesto: presupuestos[1], tarjeta: '' })
  const [faltaPara, setFaltaPara] = useState(false)

  const campo = (clave) => (event) => {
    setEncargo((actual) => ({ ...actual, [clave]: event.target.value }))
    if (clave === 'para') setFaltaPara(false)
  }

  const mensajeEncargo = [
    `Hola, quiero un arreglo a medida para ${encargo.ocasion.toLowerCase()}.`,
    `Es para: ${encargo.para.trim()}`,
    encargo.colores.trim() && `Colores: ${encargo.colores.trim()}`,
    `Presupuesto: ${encargo.presupuesto}`,
    encargo.tarjeta.trim() && `Tarjeta: «${encargo.tarjeta.trim()}»`,
  ]
    .filter(Boolean)
    .join('\n')

  const enviarEncargo = (event) => {
    if (!encargo.para.trim()) {
      event.preventDefault()
      setFaltaPara(true)
      document.getElementById('encargo-para')?.focus()
    }
  }

  const mensajeFavoritos = favorites.length
    ? `Hola, me gustaron estos arreglos: ${favorites.join(', ')}. ¿Están disponibles para hoy?`
    : 'Hola, quiero pedir flores.'

  const toggleFavorite = (name) => {
    setFavorites((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name])
  }

  return (
    <div className="min-h-screen bg-[#fbf4ed] text-[#2d1817] antialiased">
      <SaltarAlContenido className="focus:bg-[#4a151c] focus:text-white" />

      <div className="border-b border-[#e3d2c7] bg-[#f6e7dc]">
        <div className="mx-auto flex max-w-[100rem] items-center justify-between gap-4 px-5 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.26em] text-[#8a5a52] lg:px-10">
          <span className="tabular">Año III · N.º 12</span>
          <span className="hidden sm:block">Cuaderno floral · Punto Fijo, Falcón</span>
          <span>Flores frescas bajo pedido</span>
        </div>
      </div>

      <div className="mx-auto max-w-[100rem] px-5 lg:px-10">
        <div className="flex flex-col items-center gap-5 py-9 text-center lg:py-12">
          <div className="flex w-full items-center gap-4">
            <span className="h-px flex-1 bg-[#e3d2c7]" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.4em] text-[#8a4a55]">Edición de temporada</span>
            <span className="h-px flex-1 bg-[#e3d2c7]" />
          </div>
          <a href="#inicio" aria-label="Siena Flower, inicio" className="flex items-baseline justify-center gap-4">
            <span className="hidden text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#8a5a52] sm:block">Desde 2016</span>
            <span className="font-serif text-[clamp(2.75rem,7vw,5.5rem)] font-semibold leading-none tracking-[-0.02em] text-[#4a151c]">
              Siena <span className="font-medium italic">Flower</span>
            </span>
            <span className="hidden text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#8a5a52] sm:block">Floral studio</span>
          </a>
          <p className="max-w-2xl text-sm italic leading-6 text-[#76574f]">
            Ramos, cajas florales y decoración íntima armados a mano cada mañana en Punto Fijo.
          </p>
        </div>
      </div>

      <nav aria-label="Principal" className="sticky top-0 z-50 border-y border-[#e3d2c7] bg-[#fbf4ed]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[100rem] items-center gap-3 px-5 lg:px-10">
          <a href="#inicio" className="font-serif text-xl font-semibold italic text-[#4a151c] lg:hidden">Siena Flower</a>
          <ul className="hidden items-center gap-7 lg:flex">
            {enlaces.slice(0, 4).map(([id, texto], indice) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={activa === id ? 'true' : undefined}
                  className="flex items-baseline gap-2 py-1 transition hover:text-[#4a151c]"
                >
                  <span className="tabular text-[10px] font-extrabold tracking-[0.18em] text-[#8a4a55]">{folio(indice)}</span>
                  <span className={activa === id ? 'border-b-2 border-[#4a151c] font-serif text-lg font-semibold italic text-[#4a151c]' : 'barrido text-[#76574f]'}>
                    {texto}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-2">
            {favorites.length > 0 && (
              <a
                href={wa(mensajeFavoritos)}
                aria-label={`Consultar ${favorites.length} arreglos guardados`}
                className="tabular hidden border border-[#4a151c] bg-white px-3 py-2 text-xs font-extrabold text-[#4a151c] transition hover:-translate-y-0.5 hover:bg-[#4a151c] hover:text-white sm:inline-flex"
              >
                ♥ {favorites.length} guardados
              </a>
            )}
            <a href="#pedido" className="barrido-borde hidden border border-[#4a151c] bg-[#4a151c] px-5 py-2.5 text-xs font-extrabold uppercase tracking-[0.16em] text-white transition hover:-translate-y-0.5 hover:bg-[#7f2432] sm:inline-flex">
              Pedir flores
            </a>
            <MenuMovil
              enlaces={enlaces}
              activa={activa}
              cta={{ href: wa(mensajeFavoritos), texto: 'Pedir por WhatsApp' }}
              tono={{
                boton: 'border border-[#c9b1a5] bg-white text-[#4a151c]',
                panel: 'border-[#e3d2c7] bg-[#fbf4ed] text-[#2d1817]',
                activo: 'font-serif italic text-[#8a4a55]',
                cta: 'bg-[#4a151c] text-white',
              }}
            />
          </div>
        </div>
      </nav>

      <main id="contenido">
        <section id="inicio" className="mx-auto max-w-[100rem] px-5 pt-9 lg:px-10 lg:pt-12">
          <div data-reveal="corte" className="flex items-center gap-4 border-y border-[#e3d2c7] py-3 text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#8a5a52]">
            <span>Portada</span>
            <span className="h-px flex-1 bg-[#e3d2c7]" />
            <span className="tabular">Edición N.º 12</span>
            <span className="hidden h-px flex-1 bg-[#e3d2c7] sm:block" />
            <span className="hidden sm:block">Temporada 2026</span>
          </div>

          <Titulo
            as="h1"
            paso={70}
            className="mt-8 font-serif text-[clamp(3rem,10.5vw,9.5rem)] font-semibold leading-[0.86] tracking-[-0.03em] text-[#4a151c]"
          >
            Flores que parecen <span className="font-medium italic text-[#8a4a55]">escritas</span> para alguien
          </Titulo>

          <div className="mt-10 grid gap-9 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)_auto] lg:gap-10">
            <div data-reveal="sube" className="flex flex-col gap-7">
              <p className="border-l-2 border-[#4a151c] pl-5 text-base leading-7 text-[#76574f] sm:text-lg sm:leading-8">
                Ramos, cajas florales, desayunos y decoración íntima creados con flores frescas, paletas suaves y una presentación pensada para emocionar.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a href="#catalogo" className="barrido-borde inline-flex items-center justify-center border border-[#4a151c] bg-[#4a151c] px-7 py-4 text-xs font-extrabold uppercase tracking-[0.16em] text-white transition hover:-translate-y-0.5 hover:bg-[#7f2432] hover:border-[#7f2432]">
                  Ver colección
                </a>
                <a href="#pedido" className="barrido-borde inline-flex items-center justify-center border border-[#4a151c] px-7 py-4 text-xs font-extrabold uppercase tracking-[0.16em] text-[#4a151c] transition hover:-translate-y-0.5 hover:bg-[#4a151c] hover:text-white">
                  Diseñar un ramo
                </a>
              </div>

              <div className="border-t border-[#e3d2c7]">
                {cifras.map((cifra) => (
                  <div key={cifra.etiqueta} className="flex items-baseline gap-3 border-b border-[#e3d2c7] py-2.5">
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#8a5a52]">{cifra.etiqueta}</span>
                    <span aria-hidden="true" className="hidden flex-1 border-b border-dotted border-[#c9b1a5] lg:block" />
                    <Contador
                      valor={cifra.valor}
                      decimales={cifra.decimales}
                      prefijo={cifra.prefijo}
                      sufijo={cifra.sufijo}
                      className="tabular ml-auto font-serif text-xl font-semibold italic text-[#4a151c]"
                    />
                  </div>
                ))}
              </div>
            </div>

            <Figura
              src="/img/bouquet.jpg"
              alt="Ramo de rosas rosadas, durazno y blanco con eucalipto, envuelto en papel kraft y atado con cuerda"
              numero="Fig. 1"
              pie="Ramo Siena Signature, armado a mano en el atelier de Punto Fijo."
              imgClassName="h-[clamp(20rem,56vh,40rem)]"
            />

            <div className="hidden lg:flex lg:items-center lg:justify-center">
              <span className="rotate-180 text-[10px] font-extrabold uppercase tracking-[0.4em] text-[#8a5a52] [writing-mode:vertical-rl]">
                Flor de corte · armado a mano · Punto Fijo
              </span>
            </div>
          </div>
        </section>

        <DivisorPetalos />

        <section id="destacado" className="mx-auto max-w-[100rem] px-5 pb-14 lg:px-10 lg:pb-20">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
            <Figura
              src="/img/garden-table.jpg"
              alt="Mesa de jardín al atardecer con centro de flores rosadas, velas altas y copas dispuestas"
              numero="Fig. 2"
              pie="Mesa Jardín Íntimo montada para una cena civil en un jardín de Punto Fijo."
              imgClassName="h-[clamp(18rem,52vh,34rem)]"
            />

            <div className="lg:pt-4">
              <CabeceraSeccion kicker="Destacado de la temporada" nota="Doble página">
                Mesa Jardín Íntimo para <span className="font-medium italic">celebrar sin prisa</span>
              </CabeceraSeccion>

              <p data-reveal="sube" className="capitular mt-6 text-base leading-8 text-[#76574f]">
                Un centro de mesa no se improvisa: se corta, se mide y se coloca pensando en la conversación de
                quienes se sienten alrededor. Este diseño reúne rosas rosadas, ranúnculos blancos y follaje
                suelto en un jarrón de cerámica, con velas altas que bajan la luz cuando cae la tarde. Lo montamos
                el mismo día del evento y lo entregamos ya dispuesto.
              </p>

              <blockquote data-reveal="pagina" className="mt-7 border-t border-[#e3d2c7] pt-6 font-serif text-2xl italic leading-snug text-[#4a151c] sm:text-3xl">
                “Un arreglo se construye como un párrafo: una idea, ritmo y un cierre que se recuerda.”
                <span className="mt-3 block text-[10px] font-extrabold uppercase not-italic tracking-[0.24em] text-[#8a5a52]">
                  Atelier Siena · Punto Fijo
                </span>
              </blockquote>

              <div data-reveal="sube" className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-[#e3d2c7] pt-6">
                <strong className="tabular font-serif text-5xl font-semibold italic text-[#4a151c]">$120</strong>
                <span className="max-w-xs text-sm leading-6 text-[#76574f]">
                  Centro de mesa para cenas, bodas civiles y celebraciones.
                </span>
                <a
                  href={wa('Hola, quiero el arreglo Mesa Jardín Íntimo ($120).')}
                  aria-label="Pedir Mesa Jardín Íntimo"
                  className="barrido-borde ml-auto inline-flex items-center justify-center border border-[#4a151c] bg-[#4a151c] px-6 py-3.5 text-xs font-extrabold uppercase tracking-[0.16em] text-white transition hover:-translate-y-0.5 hover:border-[#7f2432] hover:bg-[#7f2432]"
                >
                  Pedir este arreglo
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="catalogo" className="border-y border-[#e3d2c7] bg-white/70 py-16 lg:py-24">
          <div className="mx-auto max-w-[100rem] px-5 lg:px-10">
            <CabeceraSeccion numero="01" kicker="Índice de la colección" nota="Precios en dólares">
              Arreglos listos <span className="font-medium italic">para regalar</span>
            </CabeceraSeccion>

            <div data-reveal="sube" className="mt-7 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <p className="max-w-md text-base leading-7 text-[#76574f]">
                Arreglos del día con flor fresca. Guarda los que te gusten con el corazón y consúltalos todos juntos.
              </p>

              <div className="-mb-1 flex gap-6 overflow-x-auto pb-1" role="group" aria-label="Filtrar por ocasión">
                {occasions.map((occasion) => (
                  <button
                    key={occasion}
                    type="button"
                    aria-pressed={activeOccasion === occasion}
                    onClick={() => setActiveOccasion(occasion)}
                    className={`shrink-0 border-b-2 pb-2 text-xs font-extrabold uppercase tracking-[0.18em] transition ${activeOccasion === occasion ? 'border-[#4a151c] text-[#4a151c]' : 'border-transparent text-[#8a5a52] hover:border-[#e3d2c7] hover:text-[#4a151c]'}`}
                  >
                    {occasion}
                  </button>
                ))}
              </div>
            </div>

            <ol className="mt-10 border-t border-[#e3d2c7]">
              {filteredArrangements.map((item, indice) => (
                <li
                  key={item.name}
                  data-reveal="sube"
                  style={{ '--retardo': `${indice * 60}ms` }}
                  className="border-b border-[#e3d2c7]"
                >
                  <article className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:gap-6">
                    <div className="flex min-w-0 flex-1 items-center gap-4 sm:gap-6">
                      <span className="tabular w-7 shrink-0 font-serif text-xl font-semibold italic text-[#8a4a55]">{folio(indice)}</span>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 shrink-0 border border-[#e0cdc2] object-cover sm:h-24 sm:w-24"
                      />
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#8a5a52]">{item.occasion}</p>
                          {item.tag && (
                            <span className="border border-[#8a4a55] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#8a4a55]">
                              {item.tag}
                            </span>
                          )}
                        </div>
                        <h3 className="mt-1 font-serif text-2xl font-semibold italic leading-tight text-[#4a151c] sm:text-3xl">{item.name}</h3>
                        <p className="mt-1 text-sm leading-6 text-[#76574f]">{item.note}</p>
                      </div>
                      <span aria-hidden="true" className="hidden flex-1 self-center border-b border-dotted border-[#c9b1a5] lg:block" />
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <strong className="tabular font-serif text-3xl font-semibold italic text-[#4a151c]">${item.price}</strong>
                      <button
                        type="button"
                        aria-pressed={favorites.includes(item.name)}
                        onClick={() => toggleFavorite(item.name)}
                        className={`grid h-11 w-11 shrink-0 place-items-center border text-lg transition ${favorites.includes(item.name) ? 'border-[#4a151c] bg-[#4a151c] text-white' : 'border-[#c9b1a5] bg-white text-[#4a151c] hover:border-[#4a151c]'}`}
                        aria-label={`Guardar ${item.name}`}
                      >
                        {favorites.includes(item.name) ? '♥' : '♡'}
                      </button>
                      <a
                        href={wa(`Hola, quiero pedir el ${item.name} ($${item.price}).`)}
                        aria-label={`Pedir ${item.name}`}
                        className="barrido-borde border border-[#4a151c] px-5 py-3 text-xs font-extrabold uppercase tracking-[0.16em] text-[#4a151c] transition hover:-translate-y-0.5 hover:bg-[#4a151c] hover:text-white"
                      >
                        Pedir
                      </a>
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <DivisorPetalos />

        <section id="servicios" className="mx-auto max-w-[100rem] px-5 py-8 lg:px-10 lg:py-14">
          <CabeceraSeccion numero="02" kicker="Servicios del atelier" nota="Con encargo previo">
            No solo vendemos flores, <span className="font-medium italic">diseñamos momentos</span>
          </CabeceraSeccion>

          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {services.map((service, indice) => (
              <figure key={service.title} data-reveal="sube" style={{ '--retardo': `${indice * 110}ms` }} className={indice === 1 ? 'md:mt-14' : indice === 2 ? 'md:mt-7' : ''}>
                <div className="border border-[#e0cdc2] bg-white p-3 shadow-[0_26px_50px_-45px_rgba(74,21,28,0.55)]">
                  <img src={service.image} alt={service.title} className="h-72 w-full object-cover sm:h-80" />
                </div>
                <figcaption className="mt-4">
                  <span className="tabular text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#8a4a55]">{folio(indice)} —</span>
                  <h3 className="mt-2 font-serif text-3xl font-semibold italic leading-tight text-[#4a151c]">{service.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#76574f]">{service.desc}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="atelier" className="mt-16 bg-[#4a151c] text-white lg:mt-24">
          <div className="mx-auto grid max-w-[100rem] gap-10 px-5 py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-10 lg:py-24">
            <div>
              <div data-reveal="corte" className="flex items-center gap-4 border-t-2 border-white/45 pt-4">
                <span className="tabular font-serif text-lg font-semibold italic text-[#f8d8c4]">03</span>
                <span className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-[#f0c3b3]">Reportaje</span>
                <span className="hidden h-px flex-1 bg-white/25 md:block" />
                <span className="hidden text-xs italic text-white/75 md:block">El ritmo del atelier</span>
              </div>
              <Titulo
                paso={75}
                className="mt-6 max-w-2xl font-serif text-[clamp(2.35rem,4.6vw,4.25rem)] font-semibold leading-[0.95] tracking-[-0.02em] text-white"
              >
                Flores frescas, armado lento <span className="font-medium italic text-[#f8d8c4]">y entrega cuidada</span>
              </Titulo>
              <p data-reveal="sube" className="mt-6 max-w-xl text-base leading-8 text-white/75 lg:text-lg">
                Compramos flor cada mañana y armamos cada pedido a mano el mismo día. Si pides antes de las 12,
                sale con la ruta de las 2.
              </p>

              <ol data-reveal="sube" className="mt-9 border-t border-white/20">
                {moments.map(([time, text], indice) => (
                  <li key={time} className="flex flex-wrap items-baseline gap-x-5 gap-y-1 border-b border-white/20 py-4">
                    <span className="tabular w-6 text-[10px] font-extrabold tracking-[0.2em] text-[#f0c3b3]">{folio(indice)}</span>
                    <strong className="font-serif text-2xl font-semibold italic text-[#f8d8c4]">{time}</strong>
                    <span className="ml-auto text-right text-sm leading-6 text-white/75">{text}</span>
                  </li>
                ))}
              </ol>
            </div>

            <Figura
              src="/img/foto-1559563362c667.jpg"
              alt="Rosa roja abierta entre hojas oscuras, fotografiada de cerca"
              numero="Fig. 3"
              pie="Corte de la mañana: la flor se revisa tallo por tallo antes de entrar al armado."
              imgClassName="h-[clamp(20rem,54vh,36rem)]"
              tono="claro"
            />
          </div>
        </section>

        <section id="resenas" className="border-b border-[#e3d2c7] bg-white/70 py-16 lg:py-24">
          <div className="mx-auto max-w-[100rem] px-5 lg:px-10">
            <CabeceraSeccion numero="04" kicker="Cartas de lectoras" nota="Publicadas con permiso">
              La emoción <span className="font-medium italic">también se diseña</span>
            </CabeceraSeccion>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {reviews.map((review, indice) => (
                <article key={review.name} data-reveal="sube" style={{ '--retardo': `${indice * 110}ms` }} className="flex flex-col border border-[#e3d2c7] bg-[#fbf4ed] p-7 shadow-[0_26px_50px_-46px_rgba(74,21,28,0.5)]">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#8a5a52]">Carta N.º {folio(indice)}</p>
                  <p className="mt-4 font-serif text-xl italic leading-8 text-[#4a151c]">“{review.text}”</p>
                  <div className="mt-auto flex items-center gap-3 border-t border-dashed border-[#dcc4b8] pt-5">
                    <img src={review.image} alt={`Retrato de ${review.name}`} className="h-12 w-12 shrink-0 rounded-full object-cover" />
                    <div className="min-w-0">
                      <h3 className="font-serif text-lg font-semibold italic text-[#4a151c]">{review.name}</h3>
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#8a5a52]">Lectora verificada</p>
                    </div>
                    <span className="ml-auto text-[#8a4a55]" aria-label="5 de 5 estrellas">★★★★★</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <DivisorPetalos />

        <section id="pedido" className="pb-20 lg:pb-28">
          <div className="mx-auto grid max-w-[100rem] gap-10 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-10">
            <div>
              <CabeceraSeccion numero="05" kicker="Pedido a medida" nota="Respuesta el mismo día">
                Cuéntanos la ocasión y armamos algo <span className="font-medium italic">irrepetible</span>
              </CabeceraSeccion>

              <p data-reveal="sube" className="mt-6 max-w-md text-base leading-7 text-[#76574f]">
                Llena lo que sepas y te escribimos el mensaje. Lo revisas en WhatsApp antes de enviarlo y te
                respondemos con una propuesta y foto de referencia.
              </p>

              <ol data-reveal="sube" className="mt-8 border-t border-[#e3d2c7]">
                {[
                  'Te proponemos flor, paleta y formato según la ocasión.',
                  'Confirmamos precio y fecha antes de armar nada.',
                  'Coordinamos entrega, dedicatoria y evidencia fotográfica.',
                ].map((paso, indice) => (
                  <li key={paso} className="flex items-baseline gap-4 border-b border-[#e3d2c7] py-4 text-sm leading-6 text-[#76574f]">
                    <span className="tabular font-serif text-lg font-semibold italic text-[#8a4a55]">{folio(indice)}</span>
                    <span>{paso}</span>
                  </li>
                ))}
              </ol>
            </div>

            <form data-reveal="pagina" className="border border-dashed border-[#c9a08f] bg-white/80 p-5 sm:p-7" onSubmit={(event) => event.preventDefault()} noValidate>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-dashed border-[#dcc4b8] pb-4 text-[10px] font-extrabold uppercase tracking-[0.26em] text-[#8a5a52]">
                <span>Boleta de encargo</span>
                <span className="tabular">Siena Flower · N.º 12</span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#4a151c]">
                  Ocasión
                  <select value={encargo.ocasion} onChange={campo('ocasion')} className="border border-[#e0cdc2] bg-white px-4 py-3 text-sm font-semibold normal-case tracking-normal text-[#2d1817] outline-none transition focus:border-[#4a151c]">
                    {occasions.slice(1).map((o) => <option key={o}>{o}</option>)}
                    <option>Aniversario</option>
                  </select>
                </label>
                <label className="grid gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#4a151c]">
                  Presupuesto
                  <select value={encargo.presupuesto} onChange={campo('presupuesto')} className="border border-[#e0cdc2] bg-white px-4 py-3 text-sm font-semibold normal-case tracking-normal text-[#2d1817] outline-none transition focus:border-[#4a151c]">
                    {presupuestos.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </label>
                <label className="grid gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#4a151c] sm:col-span-2">
                  ¿Para quién es?
                  <input
                    id="encargo-para"
                    value={encargo.para}
                    onChange={campo('para')}
                    aria-invalid={faltaPara}
                    aria-describedby="encargo-para-error"
                    placeholder="Ej: mi mamá, Carmen"
                    className={`border bg-white px-4 py-3 text-sm font-semibold normal-case tracking-normal text-[#2d1817] outline-none transition placeholder:font-medium placeholder:text-[#8a6f66] focus:border-[#4a151c] ${faltaPara ? 'border-[#b4232f]' : 'border-[#e0cdc2]'}`}
                  />
                  <span id="encargo-para-error" className="min-h-4 text-xs font-semibold normal-case tracking-normal text-[#b4232f]">{faltaPara ? 'Dinos para quién es: así elegimos flor y tarjeta.' : ''}</span>
                </label>
                <label className="grid gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#4a151c] sm:col-span-2">
                  <span>Colores o flores que le gustan <span className="font-medium text-[#8a5a52]">(opcional)</span></span>
                  <input value={encargo.colores} onChange={campo('colores')} placeholder="Ej: tonos pastel, nada de lirios" className="border border-[#e0cdc2] bg-white px-4 py-3 text-sm font-semibold normal-case tracking-normal text-[#2d1817] outline-none transition placeholder:font-medium placeholder:text-[#8a6f66] focus:border-[#4a151c]" />
                </label>
                <label className="grid gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#4a151c] sm:col-span-2">
                  <span>Mensaje para la tarjeta <span className="font-medium text-[#8a5a52]">(opcional)</span></span>
                  <textarea value={encargo.tarjeta} onChange={campo('tarjeta')} rows={3} maxLength={180} placeholder="Lo escribimos a mano" className="resize-none border border-[#e0cdc2] bg-white px-4 py-3 text-sm font-semibold normal-case tracking-normal text-[#2d1817] outline-none transition placeholder:font-medium placeholder:text-[#8a6f66] focus:border-[#4a151c]" />
                  <span className="tabular text-right text-xs font-semibold normal-case tracking-normal text-[#8a5a52]">{encargo.tarjeta.length}/180</span>
                </label>
                <a href={wa(mensajeEncargo)} onClick={enviarEncargo} className="barrido-borde inline-flex justify-center border border-[#4a151c] bg-[#4a151c] px-8 py-4 text-xs font-extrabold uppercase tracking-[0.16em] text-white transition hover:-translate-y-0.5 hover:border-[#7f2432] hover:bg-[#7f2432] active:scale-[.98] sm:col-span-2">
                  Preparar mensaje en WhatsApp
                </a>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#e3d2c7] bg-[#2d1817] text-white">
        <div className="mx-auto max-w-[100rem] px-5 py-14 lg:px-10">
          <div className="flex flex-col gap-6 border-b border-white/15 pb-9 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-serif text-4xl italic leading-none text-[#f8d8c4] sm:text-5xl">Siena Flower</p>
              <p className="mt-3 text-[10px] font-extrabold uppercase tracking-[0.3em] text-white/70">Cuaderno floral · Punto Fijo, Falcón</p>
            </div>
            <p className="max-w-md text-sm leading-6 text-white/70">
              Ramos personalizados, cajas florales, eventos íntimos y entregas sorpresa en Punto Fijo, armados a mano el mismo día.
            </p>
          </div>

          <div className="grid gap-10 py-10 md:grid-cols-3">
            <div>
              <h3 className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#f8d8c4]">Índice</h3>
              <ul className="mt-5 space-y-3 text-sm font-semibold text-white/70">
                {enlaces.map(([id, texto], indice) => (
                  <li key={id}>
                    <a href={`#${id}`} className="barrido flex items-baseline gap-3 transition hover:text-white">
                      <span className="tabular text-[10px] font-extrabold text-[#f0c3b3]">{folio(indice)}</span>
                      {texto}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#f8d8c4]">Colección</h3>
              <ul className="mt-5 space-y-3 text-sm font-semibold text-white/70">
                <li><a href="#catalogo" className="barrido transition hover:text-white">Ramos</a></li>
                <li><a href="#catalogo" className="barrido transition hover:text-white">Cajas florales</a></li>
                <li><a href="#servicios" className="barrido transition hover:text-white">Eventos</a></li>
                <li><a href="#destacado" className="barrido transition hover:text-white">Destacado de la temporada</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#f8d8c4]">Contacto</h3>
              <ul className="mt-5 space-y-3 text-sm font-semibold text-white/70">
                <li>Punto Fijo, Falcón</li>
                <li><a href={wa()} className="barrido transition hover:text-white">WhatsApp: +58 412-000-0000</a></li>
                <li>Pedidos: 8:00 AM - 6:00 PM</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/15 pt-7 text-center text-xs font-semibold text-white/60">
            © 2026 Siena Flower. Demo creada por Carlos Avila - Developer 🇻🇪 ·{' '}
            <a href="/privacidad/" className="underline underline-offset-2 hover:text-white">Privacidad</a>
          </div>
        </div>
      </footer>

      <WhatsAppFlotante texto={mensajeFavoritos} className="bg-[#4a151c] text-white" />
    </div>
  )
}

export default App
