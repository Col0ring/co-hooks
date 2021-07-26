import { useEffect, useRef } from 'react'
import { DomParam } from '../../typings/tools'
import { getDomElement } from '../../utils/tools'

// TODO: ref 传入方式
function useEventListener<K extends keyof HTMLElementEventMap>(
  ref: DomParam,
  eventName: K,
  handler: (ev: HTMLElementEventMap[K]) => void,
  options?: EventListenerOptions
): void
function useEventListener<K extends keyof ElementEventMap>(
  ref: DomParam,
  eventName: K,
  handler: (ev: ElementEventMap[K]) => void,
  options?: EventListenerOptions
): void
function useEventListener<K extends keyof DocumentEventMap>(
  ref: DomParam,
  eventName: K,
  handler: (ev: DocumentEventMap[K]) => void,
  options?: EventListenerOptions
): void
function useEventListener<K extends keyof WindowEventMap>(
  ref: DomParam,
  eventName: K,
  handler: (ev: WindowEventMap[K]) => void,
  options?: EventListenerOptions
): void
function useEventListener(
  ref: DomParam,
  eventName: string,
  handler: Function,
  options: EventListenerOptions
): void
function useEventListener(
  ref: DomParam,
  eventName: string,
  handler: Function,
  options: AddEventListenerOptions = {}
) {
  const handlerRef = useRef<Function>()
  handlerRef.current = handler

  useEffect(() => {
    const el = getDomElement(ref)
    if (!el) {
      return
    }
    const eventListener: EventListener = (event) => {
      return handlerRef.current?.(event)
    }

    el.addEventListener(eventName, eventListener, {
      capture: options.capture,
      once: options.once,
      passive: options.passive
    })

    return () => {
      el.removeEventListener(eventName, eventListener, {
        capture: options.capture
      })
    }
  }, [ref, eventName, ...Object.values(options)])
}

export default useEventListener
