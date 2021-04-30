import { useCallback, useEffect, useMemo, useRef } from 'react'

// stop,start,isActive
export type UseRafLoopReturn = [() => void, () => void, () => boolean]

export default function useRafLoop(
  callback: FrameRequestCallback,
  initiallyActive = true
): UseRafLoopReturn {
  const raf = useRef<number | null>(null)
  const rafActivity = useRef(false)
  const rafCallback = useRef(callback)
  rafCallback.current = callback

  const step = useCallback((time: number) => {
    if (rafActivity.current) {
      rafCallback.current(time)
      raf.current = requestAnimationFrame(step)
    }
  }, [])

  const result: UseRafLoopReturn = useMemo(
    () => [
      () => {
        // stop
        if (rafActivity.current) {
          rafActivity.current = false
          raf.current && cancelAnimationFrame(raf.current)
        }
      },
      () => {
        // start
        if (!rafActivity.current) {
          rafActivity.current = true
          raf.current = requestAnimationFrame(step)
        }
      },
      (): boolean => rafActivity.current // isActive
    ],
    []
  )

  // 初始是否 loop
  useEffect(() => {
    if (initiallyActive) {
      // stop
      result[1]()
    }

    // stop
    return result[0]
  }, [])

  return result
}
