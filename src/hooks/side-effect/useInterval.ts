import { useEffect } from 'react'
import useIntervalFn, { UseIntervalFnReturn } from './useIntervalFn'

type UseIntervalReturn<T extends GlobalFunction> = UseIntervalFnReturn<T>

function useInterval<T extends GlobalFunction>(
  handler: T,
  ms: number = 0,
  ...args: Parameters<T>
): UseIntervalReturn<T> {
  const context = useIntervalFn(handler, ms)
  useEffect(() => {
    context.run(...args)
  }, [ms])
  return context
}

export type { UseIntervalReturn }
export default useInterval
