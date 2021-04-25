import { useCallback, useRef, useMemo } from 'react'
import throttle from 'lodash/throttle'
import useUnmount from '../lifecycle/useUnmount'

enum ThrottleStatus {
  Pending = 'pending',
  Free = 'free'
}

interface UseThrottleFnReturn<T extends GlobalFunction> {
  currentStatus: () => ThrottleStatus
  cancel: () => void
  run: () => ReturnType<T>
  flush: () => ReturnType<T>
}

type ThrottleParams = Parameters<typeof throttle>

type ThrottleOptions = ThrottleParams[2]

// options
// maxWait	最大超时时间，单位为毫秒
// leading	是否在上升沿触发副作用函数	default	false
// trailing	是否在下降沿触发副作用函数	default	true
function useThrottleFn<T extends ThrottleParams[0]>(
  func: T,
  wait: ThrottleParams[1] = 0,
  options?: ThrottleParams[2]
): UseThrottleFnReturn<T> {
  const funcRef = useRef(func)
  funcRef.current = func

  const status = useRef<ThrottleStatus>(ThrottleStatus.Free)
  const currentStatus = useCallback(() => status.current, [])
  const throttled = useMemo(
    () =>
      throttle(
        function (this: GlobalObject, ...args) {
          status.current = ThrottleStatus.Free
          return funcRef.current.call(this, ...args)
        } as T,
        wait,
        options
      ),
    []
  )

  const run = useCallback(
    ((...args) => {
      status.current = ThrottleStatus.Pending
      return throttled(...args)
    }) as T,
    [throttled]
  )

  useUnmount(throttled.cancel)

  return {
    currentStatus,
    run,
    cancel: throttled.cancel,
    flush: (throttled.flush as unknown) as T
  }
}
export type { UseThrottleFnReturn, ThrottleParams, ThrottleOptions }
export default useThrottleFn
