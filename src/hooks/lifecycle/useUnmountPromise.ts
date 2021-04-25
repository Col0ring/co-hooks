import { useCallback } from 'react'
import useUnmountedState from '../state/useUnmountedState'

type useUnmountPromiseReturn = <T, E = any>(
  promise: Promise<T>,
  onError?: (error: E) => void
) => Promise<T>
// unmounted 才 promise
function useUnmountPromise(): useUnmountPromiseReturn {
  const isUnmounted = useUnmountedState()
  return useCallback<useUnmountPromiseReturn>(
    (promise, onError) =>
      new Promise((resolve, reject) => {
        promise.then(
          (value) => {
            !isUnmounted() && resolve(value)
          },
          (error) => {
            !isUnmounted() ? reject(error) : onError?.(error)
          }
        )
      }),
    []
  )
}
export type { useUnmountPromise }
export default useUnmountPromise
