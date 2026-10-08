import { Fragment, cloneElement, isValidElement, useCallback, useEffect, useMemo, useRef } from 'react'
import { motionActivo, useAlEntrar } from './motion.js'

function envolver(nodo, clave) {
  if (nodo === null || nodo === undefined || typeof nodo === 'boolean') return null
  if (Array.isArray(nodo)) return nodo.map((hijo, i) => envolver(hijo, `${clave}.${i}`))
  if (typeof nodo === 'string' || typeof nodo === 'number') {
    return String(nodo)
      .split(/(\s+)/)
      .map((trozo, i) => {
        if (!trozo) return null
        const k = `${clave}.${i}`
        if (/^\s+$/.test(trozo)) return <Fragment key={k}>{trozo}</Fragment>
        return (
          <span key={k} className="hueco">
            {trozo}
          </span>
        )
      })
  }
  if (isValidElement(nodo)) return cloneElement(nodo, { key: clave }, envolver(nodo.props.children, clave))
  return nodo
}

export function Titulo({ as: Etiqueta = 'h2', className = '', paso = 80, children }) {
  const ref = useRef(null)

  useEffect(() => {
    const elemento = ref.current
    if (!elemento) return undefined
    let cuadro = 0
    const medir = () => {
      const huecos = elemento.querySelectorAll('.hueco')
      let lineaPrevia = null
      let linea = 0
      let enLinea = 0
      huecos.forEach((hueco) => {
        const tope = Math.round(hueco.offsetTop / 6) * 6
        if (tope !== lineaPrevia) {
          if (lineaPrevia !== null) {
            linea += 1
            enLinea = 0
          }
          lineaPrevia = tope
        } else {
          enLinea += 1
        }
        hueco.style.setProperty('--linea', String(linea))
        hueco.style.setProperty('--hueco', String(enLinea))
      })
    }
    const programar = () => {
      cancelAnimationFrame(cuadro)
      cuadro = requestAnimationFrame(medir)
    }
    medir()
    document.fonts?.ready?.then(programar)
    window.addEventListener('resize', programar, { passive: true })
    return () => {
      cancelAnimationFrame(cuadro)
      window.removeEventListener('resize', programar)
    }
  }, [])

  return (
    <Etiqueta ref={ref} data-reveal="tipo" className={className} style={{ '--paso': `${paso}ms` }}>
      {envolver(children, 't')}
    </Etiqueta>
  )
}

const miles = (entero) => String(entero).replace(/\B(?=(\d{3})+(?!\d))/g, '.')

function formatear(valor, decimales, prefijo, sufijo) {
  const base = decimales > 0 ? valor.toFixed(decimales) : miles(Math.round(valor))
  return `${prefijo}${base}${sufijo}`
}

export function Contador({ valor, decimales = 0, prefijo = '', sufijo = '', className = '' }) {
  const ref = useRef(null)
  const animado = useRef(false)
  const texto = useMemo(() => formatear(valor, decimales, prefijo, sufijo), [valor, decimales, prefijo, sufijo])

  const alVisible = useCallback(() => {
    const elemento = ref.current
    if (!elemento || animado.current || !motionActivo()) return
    animado.current = true
    const duracion = 1250
    const inicio = performance.now()
    const avanzar = (ahora) => {
      if (!elemento.isConnected) return
      const t = Math.min(1, (ahora - inicio) / duracion)
      const suave = 1 - Math.pow(1 - t, 3)
      elemento.textContent = formatear(valor * suave, decimales, prefijo, sufijo)
      if (t < 1) requestAnimationFrame(avanzar)
      else elemento.textContent = texto
    }
    requestAnimationFrame(avanzar)
  }, [valor, decimales, prefijo, sufijo, texto])

  useAlEntrar(ref, alVisible)

  return (
    <span ref={ref} className={className}>
      {texto}
    </span>
  )
}
