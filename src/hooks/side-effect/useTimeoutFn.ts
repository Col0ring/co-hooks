import { useCallback, useEffect, useRef } from 'react'
import useUnmount from '../lifecycle/useUnmount'

enum TimeoutStatus {
  Free = 'free',
  Pending = 'pending',
  Canceled = 'cancelled',
  Called = 'called'
}

interface UseTimeoutFnReturn {
  currentStatus: () => TimeoutStatus
  cancel: () => void
  run: () => void
}

function useTimeoutFn(handler: Function, ms: number = 0): UseTimeoutFnReturn {
  const status = useRef<TimeoutStatus>(TimeoutStatus.Free)
  const timeout = useRef<ReturnType<typeof setTimeout>>()
  const callback = useRef(handler)

  const currentStatus = useCallback(() => status.current, [])

  const run = useCallback(() => {
    status.current = TimeoutStatus.Pending
    timeout.current && clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      status.current = TimeoutStatus.Called
      callback.current()
    }, ms)
  }, [ms])

  const cancel = useCallback(() => {
    status.current = TimeoutStatus.Canceled
    timeout.current && clearTimeout(timeout.current)
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

export type { UseTimeoutFnReturn }
export default useTimeoutFn
