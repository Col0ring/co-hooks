import { useCallback, useRef } from 'react'
import useUnmount from '../lifecycle/useUnmount'

enum TimeoutStatus {
  Free = 'free',
  Pending = 'pending',
  Canceled = 'cancelled',
  Called = 'called'
}

interface UseTimeoutFnReturn<T extends GlobalFunction> {
  currentStatus: () => 'free' | 'pending' | 'cancelled' | 'called'
  cancel: () => void
  run: (...args: Parameters<T>) => void
}

function useTimeoutFn<T extends GlobalFunction>(
  handler: T,
  ms: number = 0
): UseTimeoutFnReturn<T> {
  const status = useRef<TimeoutStatus>(TimeoutStatus.Free)
  const timeout = useRef<ReturnType<typeof setTimeout>>()
  const callback = useRef(handler)
  callback.current = handler

  const currentStatus = useCallback(() => status.current, [])

  const run = useCallback(
    (...args) => {
      status.current = TimeoutStatus.Pending
      timeout.current && clearTimeout(timeout.current)
      timeout.current = setTimeout(() => {
        status.current = TimeoutStatus.Called
        callback.current(...args)
      }, ms)
    },
    [ms]
  )

  const cancel = useCallback(() => {
    status.current = TimeoutStatus.Canceled
    timeout.current && clearTimeout(timeout.current)
  }, [])

  useUnmount(cancel)

  return {
    currentStatus,
    run,
    cancel
  }
}

export type { UseTimeoutFnReturn }
export default useTimeoutFn
