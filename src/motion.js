import { useEffect, useRef } from 'react'

const observacion = { rootMargin: '0px 0px -12% 0px', threshold: [0, 0.12] }

export function motionActivo() {
  if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return false
  const reduccion = typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null
  return !reduccion?.matches
}

function alEntrar(elemento, alVisible) {
  if (!elemento || !motionActivo()) return undefined
  const observador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue
        entrada.target.classList.add('is-in')
        observador.disconnect()
        alVisible?.(entrada.target)
      }
    },
    observacion,
  )
  observador.observe(elemento)
  return () => observador.disconnect()
}

export function useAlEntrar(ref, alVisible) {
  useEffect(() => alEntrar(ref.current, alVisible), [ref, alVisible])
}

export function useRevelados() {
  const observador = useRef(null)

  useEffect(() => {
    if (!motionActivo()) return undefined
    const io = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue
          entrada.target.classList.add('is-in')
          io.unobserve(entrada.target)
        }
      },
      observacion,
    )
    observador.current = io
    return () => {
      io.disconnect()
      observador.current = null
    }
  }, [])

  useEffect(() => {
    const io = observador.current
    if (!io) return undefined
    document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((elemento) => io.observe(elemento))
    return undefined
  })
}

const conParallax = new Set()
let parallaxEnEspera = false

function pintarParallax() {
  parallaxEnEspera = false
  const mitad = window.innerHeight / 2
  conParallax.forEach((registro) => {
    const caja = registro.elemento.getBoundingClientRect()
    if (caja.bottom < -120 || caja.top > window.innerHeight + 120) return
    const progreso = (caja.top + caja.height / 2 - mitad) / (mitad + caja.height / 2)
    registro.elemento.style.setProperty('--par', `${(-progreso * registro.fuerza).toFixed(2)}px`)
  })
}

function programarParallax() {
  if (parallaxEnEspera) return
  parallaxEnEspera = true
  requestAnimationFrame(pintarParallax)
}

function vigilarParallax() {
  if (conParallax.size !== 1) return
  window.addEventListener('scroll', programarParallax, { passive: true })
  window.addEventListener('resize', programarParallax, { passive: true })
}

function soltarParallax() {
  if (conParallax.size !== 0) return
  window.removeEventListener('scroll', programarParallax)
  window.removeEventListener('resize', programarParallax)
}

export function useParallax(ref, fuerza = 10) {
  useEffect(() => {
    const elemento = ref.current
    if (!elemento || !motionActivo()) return undefined
    const registro = { elemento, fuerza }
    conParallax.add(registro)
    vigilarParallax()
    pintarParallax()
    return () => {
      conParallax.delete(registro)
      soltarParallax()
      elemento.style.removeProperty('--par')
    }
  }, [ref, fuerza])
}
