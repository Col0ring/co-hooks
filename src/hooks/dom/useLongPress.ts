import React, { useCallback, useRef } from 'react'

interface UseLongPressOptions {
  isPreventDefault?: boolean
  delay?: number
}

function isTouchEvent(ev: Event): ev is TouchEvent {
  return 'touches' in ev
}

function preventDefault(ev: Event) {
  if (!isTouchEvent(ev)) {
    return
  }

  if (ev.touches.length < 2 && ev.preventDefault) {
    ev.preventDefault()
  }
}

function useLongPress(
  callback: (e: React.TouchEvent | React.MouseEvent) => void,
  { isPreventDefault = true, delay = 300 }: UseLongPressOptions = {}
) {
  const timeout = useRef<ReturnType<typeof setTimeout>>()
  const target = useRef<EventTarget | null>(null)

  const start = useCallback(
    (event: React.TouchEvent | React.MouseEvent) => {
      // prevent ghost click on mobile devices
      if (isPreventDefault && event.target) {
        event.target.addEventListener('touchend', preventDefault, {
          passive: false
        })

        target.current = event.target
      }
      timeout.current = setTimeout(() => callback(event), delay)
    },
    [callback, delay, isPreventDefault]
  )

  const clear = useCallback(() => {
    // clearTimeout and removeEventListener
    timeout.current && clearTimeout(timeout.current)

    if (isPreventDefault && target.current) {
      target.current.removeEventListener('touchend', preventDefault)
    }
  }, [isPreventDefault])

  return {
    onMouseDown: start,
    onTouchStart: start,
    onMouseUp: clear,
    onMouseLeave: clear,
    onTouchEnd: clear
  } as const
}

export type { UseLongPressOptions }
export default useLongPress
