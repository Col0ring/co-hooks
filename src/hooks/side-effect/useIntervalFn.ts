import { useCallback, useEffect, useRef } from 'react'
import useUnmount from '../lifecycle/useUnmount'

enum IntervalStatus {
  Free = 'free',
  Pending = 'pending',
  Canceled = 'cancelled',
  Calling = 'calling'
}

interface UseIntervalFnReturn<T extends GlobalFunction> {
  currentStatus: () => IntervalStatus
  cancel: () => void
  run: (...args: Parameters<T>) => void
}
type A = [a: string, b: number]
type B = Partial<A>
function useIntervalFn<T extends GlobalFunction>(
  handler: T,
  ms: number = 0
): UseIntervalFnReturn<T> {
  const status = useRef<IntervalStatus>(IntervalStatus.Free)
  const interval = useRef<ReturnType<typeof setInterval>>()
  const callback = useRef(handler)

  const currentStatus = useCallback(() => status.current, [])

  const run = useCallback(
    (...args) => {
      status.current = IntervalStatus.Pending
      interval.current && clearInterval(interval.current)
      interval.current = setInterval(() => {
        status.current = IntervalStatus.Calling
        callback.current(...args)
      }, ms)
    },
    [ms]
  )

  const cancel = useCallback(() => {
    status.current = IntervalStatus.Canceled
    interval.current && clearInterval(interval.current)
  }, [])

  useEffect(() => {
    callback.current = handler
  }, [handler])

  useUnmount(cancel)

  return {
    currentStatus,
    run,
    cancel
  }
}

export type { UseIntervalFnReturn }
export default useIntervalFn
