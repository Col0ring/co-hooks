import { useEffect } from 'react'
import useTimeoutFn, { UseTimeoutFnReturn } from './useTimeoutFn'

type UseTimeoutReturn = UseTimeoutFnReturn

function useTimeout(handler: Function, ms: number = 0): UseTimeoutReturn {
  const context = useTimeoutFn(handler, ms)
  useEffect(() => {
    context.run()
  }, [ms])
  return context
}

export type { UseTimeoutReturn }
export default useTimeout
