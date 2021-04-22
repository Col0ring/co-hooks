import { useCallback } from 'react'
import useMountedState from './useMountedState'

type UsePromiseReturn = <T>(promise: Promise<T>) => Promise<T>

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
