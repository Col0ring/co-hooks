import { useMemo } from 'react'
import useLatest from './useLatest'

function useGetter<T, R = T>(
  state: T,
  transform: (state: T) => R = (v) => (v as unknown) as R
) {
  const stateRef = useLatest(state)
  const transformRef = useLatest(transform)
  const stateGetter = useMemo(
    () => ({
      get value() {
        return transformRef.current(stateRef.current)
      }
    }),
    []
  )
  return stateGetter
}

export default useGetter
