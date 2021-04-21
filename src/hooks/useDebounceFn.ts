import { useCallback, useRef, useMemo } from 'react'
import debounce from 'lodash/debounce'
import useUnmount from './useUnmount'

enum DebounceStatus {
  Pending = 'pending',
  Free = 'free'
}

interface UseDebounceFnReturn<T extends GlobalFunction> {
  currentStatus: () => DebounceStatus
  cancel: () => void
  run: () => ReturnType<T>
  flush: () => ReturnType<T>
}

type DebounceParams = Parameters<typeof debounce>

type DebounceOptions = DebounceParams[2]

// options
// maxWait	最大超时时间，单位为毫秒
// leading	是否在上升沿触发副作用函数	default	false
// trailing	是否在下降沿触发副作用函数	default	true
function useDebounceFn<T extends DebounceParams[0]>(
  func: T,
  wait: DebounceParams[1] = 0,
  options?: DebounceParams[2]
): UseDebounceFnReturn<T> {
  const funcRef = useRef(func)
  funcRef.current = func

  const status = useRef<DebounceStatus>(DebounceStatus.Free)
  const currentStatus = useCallback(() => status.current, [])
  const debounced = useMemo(
    () =>
      debounce(
        function (this: GlobalObject, ...args) {
          status.current = DebounceStatus.Free
          return funcRef.current.call(this, ...args)
        } as T,
        wait,
        options
      ),
    []
  )

  const run = useCallback(
    ((...args) => {
      status.current = DebounceStatus.Pending
      return debounced(...args)
    }) as T,
    [debounced]
  )

  useUnmount(debounced.cancel)

  return {
    currentStatus,
    run,
    cancel: debounced.cancel,
    flush: (debounced.flush as unknown) as T
  }
}
export type { UseDebounceFnReturn, DebounceParams, DebounceOptions }
export default useDebounceFn
