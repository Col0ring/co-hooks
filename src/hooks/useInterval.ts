import { useEffect } from 'react'
import useIntervalFn, { UseIntervalFnReturn } from './useIntervalFn'

type UseIntervalReturn = UseIntervalFnReturn

function useInterval(handler: Function, ms: number = 0): UseIntervalReturn {
  const context = useIntervalFn(handler, ms)
  useEffect(() => {
    context.run()
  }, [ms])
  return context
}

export type { UseIntervalReturn }
export default useInterval
