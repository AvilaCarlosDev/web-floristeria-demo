import { useMemo, useState } from 'react'
import { MenuMovil, SaltarAlContenido, WhatsAppFlotante } from './sitio.jsx'
import { useSeccionActiva, wa } from './navegacion.js'

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

function App() {
  const [activeOccasion, setActiveOccasion] = useState('Todos')
  const [favorites, setFavorites] = useState([])

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
      <SaltarAlContenido className="focus:rounded-full focus:bg-[#4a151c] focus:text-white" />
      <div className="bg-[#4a151c] text-[11px] font-semibold tracking-[0.18em] text-rose-50/80">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-x-8 px-5 py-2.5 text-center uppercase md:justify-between">
          <span>Flores frescas bajo pedido</span>
          <span className="hidden md:inline">Entregas en Punto Fijo y zonas cercanas</span>
          <span className="hidden md:inline">Diseños personalizados por WhatsApp</span>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-[#ead8cf] bg-[#fbf4ed]/88 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center gap-4 px-5 lg:px-8">
          <a href="#inicio" className="flex shrink-0 items-center gap-3" aria-label="Siena Flower inicio">
            <span className="grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-full bg-[#4a151c] font-serif text-xl italic text-[#f8d8c4] shadow-xl shadow-[#4a151c]/10">S</span>
            <span>
              <span className="block font-serif text-2xl italic tracking-tight">Siena Flower</span>
              <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-[#8f6a60]">Floral studio</span>
            </span>
          </a>

          <nav aria-label="Principal" className="ml-auto hidden items-center gap-6 text-sm font-bold text-[#785a52] lg:flex">
            {enlaces.slice(0, 4).map(([id, texto]) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={activa === id ? 'true' : undefined}
                className={`py-1 transition hover:text-[#4a151c] ${activa === id ? 'font-serif text-lg font-semibold italic text-[#4a151c]' : ''}`}
              >
                {texto}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            {favorites.length > 0 && (
              <a href={wa(mensajeFavoritos)} aria-label={`Consultar ${favorites.length} arreglos guardados`} className="tabular hidden rounded-full bg-white px-3 py-2 text-xs font-black text-[#4a151c] shadow-sm transition hover:bg-[#4a151c] hover:text-white sm:inline-flex">
                ♥ {favorites.length}
              </a>
            )}
            <a href="#pedido" className="hidden rounded-full bg-[#4a151c] px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#4a151c]/10 transition hover:bg-[#7f2432] active:scale-[.98] sm:inline-flex">
              Pedir flores
            </a>
            <MenuMovil
              enlaces={enlaces}
              activa={activa}
              cta={{ href: wa(mensajeFavoritos), texto: 'Pedir por WhatsApp' }}
              tono={{
                boton: 'rounded-full border border-[#d9b7aa] bg-white text-[#4a151c]',
                panel: 'border-[#ead8cf] bg-[#fbf4ed] text-[#4a151c]',
                activo: 'font-serif italic text-[#9f5964]',
                cta: 'rounded-full bg-[#4a151c] text-white',
              }}
            />
          </div>
        </div>
      </header>

      <main id="contenido">
        <section id="inicio" className="relative overflow-hidden">
          <div className="absolute left-[-8rem] top-20 h-72 w-72 rounded-full bg-[#f3c7b4]/55 blur-3xl" />
          <div className="absolute right-[-8rem] top-44 h-80 w-80 rounded-full bg-[#d88fa0]/35 blur-3xl" />

          <div className="mx-auto grid min-h-[760px] max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
            <div className="relative z-10 max-w-2xl">
              <p className="mb-6 text-sm font-black uppercase tracking-[0.24em] text-[#9f5964]">Boutique floral · hecho a mano</p>
              <h1 className="font-serif text-6xl font-medium italic leading-[0.92] tracking-[-0.02em] text-[#4a151c] sm:text-7xl lg:text-8xl">
                Flores que parecen escritas para alguien
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-[#76574f]">
                Ramos, cajas florales, desayunos y decoración íntima creados con flores frescas, paletas suaves y una presentación pensada para emocionar.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a href="#catalogo" className="inline-flex items-center justify-center rounded-full bg-[#4a151c] px-8 py-4 text-base font-black text-white transition hover:bg-[#7f2432]">
                  Ver colección
                </a>
                <a href="#pedido" className="inline-flex items-center justify-center rounded-full border border-[#d9b7aa] bg-white/55 px-8 py-4 text-base font-black text-[#4a151c] backdrop-blur transition hover:bg-white">
                  Diseñar un ramo
                </a>
              </div>
              <div className="mt-12 grid max-w-xl grid-cols-3 divide-x divide-[#e5cfc6] rounded-[2rem] border border-[#ead8cf] bg-white/45 p-2 backdrop-blur">
                {[
                  ['+1.800', 'entregas'],
                  ['24h', 'por encargo'],
                  ['4.9★', 'reseñas'],
                ].map(([value, label]) => (
                  <div key={label} className="px-4 py-3 text-center">
                    <strong className="tabular block font-serif text-3xl font-semibold italic text-[#4a151c]">{value}</strong>
                    <span className="text-[11px] font-black uppercase tracking-wide text-[#9a7469]">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 grid min-h-[620px] grid-cols-2 gap-4">
              <div className="mt-20 overflow-hidden rounded-t-full rounded-b-[2rem] bg-white p-3 shadow-2xl shadow-[#4a151c]/10">
                <img src="/img/bouquet.jpg" alt="Ramo de rosas rosadas" className="h-full w-full rounded-t-full rounded-b-[1.5rem] object-cover" />
              </div>
              <div className="space-y-4">
                <div className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-xl shadow-[#4a151c]/10">
                  <img src="/img/foto-14907509678688.jpg" alt="Flores frescas" className="h-72 w-full rounded-[1.5rem] object-cover" />
                </div>
                <div className="rounded-[2rem] bg-[#4a151c] p-7 text-white shadow-xl shadow-[#4a151c]/15">
                  <p className="font-serif text-3xl italic leading-tight">“Cada ramo se arma como una pequeña carta.”</p>
                  <p className="mt-5 text-sm font-semibold text-white/58">Atelier Siena · Punto Fijo</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="catalogo" className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#9f5964]">Colección floral</p>
                <h2 className="mt-3 max-w-3xl font-serif text-5xl italic tracking-[-0.02em] text-[#4a151c] sm:text-6xl">Arreglos listos para regalar</h2>
              </div>
              <p className="max-w-md text-base leading-7 text-[#76574f]">Arreglos del día con flor fresca. Guarda los que te gusten con el corazón y consúltalos todos juntos.</p>
            </div>

            <div className="mb-10 flex gap-3 overflow-x-auto pb-2" role="group" aria-label="Filtrar por ocasión">
              {occasions.map((occasion) => (
                <button
                  key={occasion}
                  type="button"
                  aria-pressed={activeOccasion === occasion}
                  onClick={() => setActiveOccasion(occasion)}
                  className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-black transition ${activeOccasion === occasion ? 'border-[#4a151c] bg-[#4a151c] text-white' : 'border-[#ead8cf] bg-[#fbf4ed] text-[#785a52] hover:border-[#4a151c]'}`}
                >
                  {occasion}
                </button>
              ))}
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredArrangements.map((item) => (
                <article key={item.name} className="group flex flex-col overflow-hidden rounded-[2rem] border border-[#ead8cf] bg-[#fbf4ed] shadow-sm transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#4a151c]/10">
                  <div className="relative aspect-[4/4.6] overflow-hidden bg-[#f2dfd6]">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    {item.tag && <span className="absolute left-5 top-5 rounded-full bg-white/88 px-4 py-2 text-xs font-black uppercase tracking-wide text-[#4a151c] backdrop-blur">{item.tag}</span>}
                    <button
                      type="button"
                      aria-pressed={favorites.includes(item.name)}
                      onClick={() => toggleFavorite(item.name)}
                      className={`absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full text-lg shadow-sm backdrop-blur transition ${favorites.includes(item.name) ? 'bg-[#4a151c] text-white' : 'bg-white/88 text-[#4a151c] hover:bg-[#4a151c] hover:text-white'}`}
                      aria-label={`Guardar ${item.name}`}
                    >
                      {favorites.includes(item.name) ? '♥' : '♡'}
                    </button>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#9f5964]">{item.occasion}</p>
                    <h3 className="mt-2 font-serif text-3xl italic leading-tight text-[#4a151c]">{item.name}</h3>
                    <p className="mt-3 mb-6 text-sm leading-6 text-[#76574f]">{item.note}</p>
                    <div className="mt-auto flex items-center justify-between gap-4">
                      <strong className="tabular font-serif text-3xl font-semibold italic text-[#4a151c]">${item.price}</strong>
                      <a href={wa(`Hola, quiero pedir el ${item.name} ($${item.price}).`)} aria-label={`Pedir ${item.name}`} className="rounded-full bg-[#4a151c] px-5 py-3 text-sm font-black text-white transition hover:bg-[#7f2432] active:scale-95">
                        Pedir
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="servicios" className="py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#9f5964]">Servicios</p>
              <h2 className="mt-3 font-serif text-5xl italic tracking-[-0.02em] text-[#4a151c] sm:text-6xl">No solo vendemos flores, diseñamos momentos</h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {services.map((service) => (
                <article key={service.title} className="group overflow-hidden rounded-t-full rounded-b-[2rem] bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#4a151c]/10">
                  <img src={service.image} alt={service.title} className="h-80 w-full rounded-t-full rounded-b-[1.5rem] object-cover transition duration-700 group-hover:scale-[1.03]" />
                  <div className="p-6 text-center">
                    <h3 className="font-serif text-3xl italic text-[#4a151c]">{service.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#76574f]">{service.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="atelier" className="bg-[#4a151c] px-5 py-24 text-white lg:px-8">
          <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.04] lg:grid-cols-[1fr_1fr]">
            <div className="p-8 sm:p-12 lg:p-16">
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#f4c6b4]">El ritmo del atelier</p>
              <h2 className="mt-4 max-w-2xl font-serif text-5xl italic tracking-[-0.02em] sm:text-6xl">Flores frescas, armado lento y entrega cuidada</h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/64">Compramos flor cada mañana y armamos cada pedido a mano el mismo día. Si pides antes de las 12, sale con la ruta de las 2.</p>
              <div className="mt-9 divide-y divide-white/10 rounded-[2rem] border border-white/10 bg-white/[0.04]">
                {moments.map(([time, text]) => (
                  <div key={time} className="flex items-center justify-between gap-5 px-5 py-4">
                    <strong className="font-serif text-2xl italic text-[#f8d8c4]">{time}</strong>
                    <span className="text-right text-sm font-semibold text-white/62">{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative min-h-[460px]">
              <img src="/img/foto-1559563362c667.jpg" alt="Florista preparando arreglo" className="absolute inset-0 h-full w-full object-cover opacity-75" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4a151c]/90 to-transparent" />
            </div>
          </div>
        </section>

        <section id="resenas" className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#9f5964]">Reseñas</p>
              <h2 className="mt-3 font-serif text-5xl italic tracking-[-0.02em] text-[#4a151c] sm:text-6xl">La emoción también se diseña</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {reviews.map((review) => (
                <article key={review.name} className="rounded-[2rem] border border-[#ead8cf] bg-[#fbf4ed] p-7">
                  <div className="mb-6 text-[#b56b76]" aria-label="5 de 5 estrellas">★★★★★</div>
                  <p className="text-base leading-8 text-[#76574f]">“{review.text}”</p>
                  <div className="mt-7 flex items-center gap-3">
                    <img src={review.image} alt={review.name} className="h-12 w-12 rounded-full object-cover" />
                    <strong className="text-sm font-black text-[#4a151c]">{review.name}</strong>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="pedido" className="px-5 py-24 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-10 rounded-[2.5rem] bg-[#f1d6c8] p-6 shadow-2xl shadow-[#4a151c]/10 sm:p-12 lg:grid-cols-[.9fr_1.1fr] lg:p-14">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#9f5964]">Pedido a medida</p>
              <h2 className="mt-4 font-serif text-5xl italic tracking-[-0.02em] text-[#4a151c] sm:text-6xl">Cuéntanos la ocasión y armamos algo irrepetible</h2>
              <p className="mt-5 max-w-md text-base leading-7 text-[#76574f]">Llena lo que sepas y te escribimos el mensaje. Lo revisas en WhatsApp antes de enviarlo y te respondemos con una propuesta y foto de referencia.</p>
            </div>
            <form className="grid gap-4 rounded-[2rem] bg-white/70 p-5 sm:grid-cols-2 sm:p-7" onSubmit={(event) => event.preventDefault()} noValidate>
              <label className="grid gap-2 text-sm font-bold text-[#4a151c]">
                Ocasión
                <select value={encargo.ocasion} onChange={campo('ocasion')} className="rounded-2xl border border-[#e5cfc6] bg-white px-4 py-3 font-semibold outline-none transition focus:border-[#4a151c]">
                  {occasions.slice(1).map((o) => <option key={o}>{o}</option>)}
                  <option>Aniversario</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm font-bold text-[#4a151c]">
                Presupuesto
                <select value={encargo.presupuesto} onChange={campo('presupuesto')} className="rounded-2xl border border-[#e5cfc6] bg-white px-4 py-3 font-semibold outline-none transition focus:border-[#4a151c]">
                  {presupuestos.map((p) => <option key={p}>{p}</option>)}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-bold text-[#4a151c] sm:col-span-2">
                ¿Para quién es?
                <input
                  id="encargo-para"
                  value={encargo.para}
                  onChange={campo('para')}
                  aria-invalid={faltaPara}
                  aria-describedby="encargo-para-error"
                  placeholder="Ej: mi mamá, Carmen"
                  className={`rounded-2xl border bg-white px-4 py-3 font-semibold outline-none transition placeholder:font-medium placeholder:text-[#b69990] focus:border-[#4a151c] ${faltaPara ? 'border-[#b4232f]' : 'border-[#e5cfc6]'}`}
                />
                <span id="encargo-para-error" className="min-h-4 text-xs font-semibold text-[#b4232f]">{faltaPara ? 'Dinos para quién es: así elegimos flor y tarjeta.' : ''}</span>
              </label>
              <label className="grid gap-2 text-sm font-bold text-[#4a151c] sm:col-span-2">
                <span>Colores o flores que le gustan <span className="font-medium text-[#9a7469]">(opcional)</span></span>
                <input value={encargo.colores} onChange={campo('colores')} placeholder="Ej: tonos pastel, nada de lirios" className="rounded-2xl border border-[#e5cfc6] bg-white px-4 py-3 font-semibold outline-none transition placeholder:font-medium placeholder:text-[#b69990] focus:border-[#4a151c]" />
              </label>
              <label className="grid gap-2 text-sm font-bold text-[#4a151c] sm:col-span-2">
                <span>Mensaje para la tarjeta <span className="font-medium text-[#9a7469]">(opcional)</span></span>
                <textarea value={encargo.tarjeta} onChange={campo('tarjeta')} rows={3} maxLength={180} placeholder="Lo escribimos a mano" className="resize-none rounded-2xl border border-[#e5cfc6] bg-white px-4 py-3 font-semibold outline-none transition placeholder:font-medium placeholder:text-[#b69990] focus:border-[#4a151c]" />
                <span className="tabular text-right text-xs font-semibold text-[#9a7469]">{encargo.tarjeta.length}/180</span>
              </label>
              <a href={wa(mensajeEncargo)} onClick={enviarEncargo} className="inline-flex justify-center rounded-full bg-[#4a151c] px-8 py-4 text-base font-black text-white transition hover:bg-[#7f2432] active:scale-[.98] sm:col-span-2">
                Preparar mensaje en WhatsApp
              </a>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-[#2d1817] py-14 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[#f8d8c4] font-serif text-xl italic text-[#4a151c]">S</span>
              <div>
                <span className="block font-serif text-2xl italic">Siena Flower</span>
                <span className="text-xs font-semibold text-white/45">Floral studio boutique</span>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-6 text-white/50">Ramos personalizados, cajas florales, eventos íntimos y entregas sorpresa en Punto Fijo, armados a mano el mismo día.</p>
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-wide">Colección</h3>
            <ul className="mt-5 space-y-3 text-sm font-semibold text-white/50">
              <li><a href="#catalogo" className="hover:text-white">Ramos</a></li>
              <li><a href="#catalogo" className="hover:text-white">Cajas florales</a></li>
              <li><a href="#servicios" className="hover:text-white">Eventos</a></li>
              <li><a href="#atelier" className="hover:text-white">Atelier</a></li>
              <li><a href="#pedido" className="hover:text-white">Pedido a medida</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-wide">Contacto</h3>
            <ul className="mt-5 space-y-3 text-sm font-semibold text-white/50">
              <li>Punto Fijo, Falcón</li>
              <li><a href={wa()} className="hover:text-white">WhatsApp: +58 412-000-0000</a></li>
              <li>Pedidos: 8:00 AM - 6:00 PM</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 px-5 pt-7 text-center text-xs font-semibold text-white/35 lg:px-8">
          © 2026 Siena Flower. Demo creada por Carlos Avila - Developer 🇻🇪 ·{' '}
          <a href="/privacidad/" className="underline underline-offset-2 hover:text-white/60">Privacidad</a>
        </div>
      </footer>
      <WhatsAppFlotante texto={mensajeFavoritos} className="bg-[#4a151c] text-white" />
    </div>
  )
}

export default App
