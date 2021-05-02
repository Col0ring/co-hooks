import React, { useEffect, useState } from 'react'

type InViewport = boolean | undefined

function isInViewPort(el: Element): InViewport {
  if (!el) {
    return undefined
  }

  const viewPortWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth
  const viewPortHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight
  const rect = el.getBoundingClientRect()

  if (rect) {
    const { top, bottom, left, right } = rect
    return (
      bottom > 0 && top <= viewPortHeight && left <= viewPortWidth && right > 0
    )
  }

  return false
}

function useInViewport(ref: React.RefObject<Element>): InViewport {
  const [inViewPort, setInViewport] = useState<InViewport>()

  useEffect(() => {
    if (ref.current) {
      setInViewport(isInViewPort(ref.current))
    }
  }, [ref])

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setInViewport(true)
        } else {
          setInViewport(false)
        }
      }
    })

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [ref])

  return inViewPort
}
export type { InViewport }
export default useInViewport
