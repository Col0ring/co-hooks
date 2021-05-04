import { useEffect } from 'react'
import useTimeoutFn, { UseTimeoutFnReturn } from './useTimeoutFn'

type UseTimeoutReturn<T extends GlobalFunction> = UseTimeoutFnReturn<T>

function useTimeout<T extends GlobalFunction>(
  handler: T,
  ms: number = 0,
  ...args: Parameters<T>
): UseTimeoutReturn<T> {
  const context = useTimeoutFn(handler, ms)
  useEffect(() => {
    context.run(...args)
  }, [ms])
  return context
}

export type { UseTimeoutReturn }
export default useTimeout
