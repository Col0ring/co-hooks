import { useRef, useCallback } from 'react'
import { AsyncFunction } from '../typings/tools'

function useLockFn<P extends any[] = any[], R = any>(fn: AsyncFunction<P, R>) {
  const lockRef = useRef(false)

  const lockFn = useCallback(
    async (...args: P) => {
      if (lockRef.current) {
        return
      }
      lockRef.current = true
      try {
        return fn(...args)
      } catch (e) {
        throw e
      } finally {
        lockRef.current = false
      }
    },
    [fn]
  )
  return lockFn
}

export default useLockFn
