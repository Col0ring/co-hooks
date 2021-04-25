import { useCallback } from 'react'
import useMountedState from '../state/useMountedState'

type UsePromiseReturn = <T>(promise: Promise<T>) => Promise<T>
// Mounted 后才 promise
function usePromise(): UsePromiseReturn {
  const isMounted = useMountedState()
  return useCallback(
    <T>(promise: Promise<T>) =>
      new Promise<T>((resolve, reject) => {
        promise.then(
          (value) => {
            isMounted() && resolve(value)
          },
          (error) => {
            isMounted() && reject(error)
          }
        )
      }),
    []
  )
}
export type { UsePromiseReturn }
export default usePromise
