import { useEffect, useState } from 'react'
import useThrottleFn from '../side-effect/useThrottleFn'
const defaultEvents: (keyof WindowEventMap)[] = [
  'mousemove',
  'mousedown',
  'resize',
  'keydown',
  'touchstart',
  'wheel'
]
// 默认一分钟算闲置
const oneMinute = 60e3

function useIdle(
  ms: number = oneMinute,
  initialState: boolean = false,
  events: (keyof WindowEventMap)[] = defaultEvents
): boolean {
  const [state, setState] = useState(initialState)
  // 节流
  const { run } = useThrottleFn((cb: () => void) => cb(), 50)

  useEffect(() => {
    let mounted = true
    // 内部与 state 无关，我们直接内部保存
    let localState = state
    let timeout: ReturnType<typeof setTimeout>

    const safeSetState = (newState: boolean) => {
      // 防止重新渲染的时候执行了
      if (mounted) {
        localState = newState
        setState(newState)
      }
    }

    const onEvent = () => {
      run(() => {
        if (localState) {
          safeSetState(false)
        }
        clearTimeout(timeout)
        timeout = setTimeout(() => safeSetState(true), ms)
      })
    }

    const onVisibility = () => {
      if (!document.hidden) {
        onEvent()
      }
    }

    for (let i = 0; i < events.length; i++) {
      window.addEventListener(events[i], onEvent)
    }

    document.addEventListener('visibilitychange', onVisibility)

    timeout = setTimeout(() => safeSetState(true), ms)

    return () => {
      mounted = false
      for (let i = 0; i < events.length; i++) {
        window.removeEventListener(events[i], onEvent)
      }
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [ms, ...events])

  return state
}

export default useIdle
