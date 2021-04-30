import { useMemo } from 'react'
import useLatest from './useLatest'
function useGetter<T>(state: T) {
  const stateRef = useLatest(state)
  const stateGetter = useMemo(
    () => ({
      get value() {
        return stateRef.current
      }
    }),
    []
  )
  return stateGetter
}

export default useGetter
