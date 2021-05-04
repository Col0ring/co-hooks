import { useMemo, useRef } from 'react'
import useMountedState from './useMountedState'
import useForceUpdate from './useForceUpdate'
import useUpdateEffect from '../lifecycle/useUpdateEffect'

interface UseStateListReturn<T> {
  state: T
  currentIndex: number
  setStateAt: (newIndex: number) => void
  setState: (state: T) => void
  next: () => void
  prev: () => void
}

function useStateList<T>(stateSet: T[] = []): UseStateListReturn<T> {
  const isMounted = useMountedState()
  const forceUpdate = useForceUpdate()
  const index = useRef(0)

  // If new state list is shorter that before - switch to the last element
  useUpdateEffect(() => {
    if (stateSet.length <= index.current) {
      index.current = stateSet.length - 1
      forceUpdate()
    }
  }, [stateSet.length])

  const actions = useMemo(
    () => ({
      next: () => actions.setStateAt(index.current + 1),
      prev: () => actions.setStateAt(index.current - 1),
      setStateAt: (newIndex: number) => {
        // do nothing on unmounted component
        if (!isMounted()) return

        // do nothing on empty states list
        if (!stateSet.length) return

        // in case new index is equal current - do nothing
        if (newIndex === index.current) return

        // it gives the ability to travel through the left and right borders.
        // 4ex: if list contains 5 elements, attempt to set index 9 will bring use to 5th element
        // in case of negative index it will start counting from the right, so -17 will bring us to 4th element
        // 取余
        index.current =
          newIndex >= 0
            ? newIndex % stateSet.length
            : stateSet.length + (newIndex % stateSet.length)
        forceUpdate()
      },
      setState: (state: T) => {
        // do nothing on unmounted component
        if (!isMounted()) return

        const newIndex = stateSet.length ? stateSet.indexOf(state) : -1

        if (newIndex === -1) {
          throw new Error(
            `State '${state}' is not a valid state (does not exist in state list)`
          )
        }

        index.current = newIndex
        forceUpdate()
      }
    }),
    [stateSet, isMounted]
  )

  return {
    state: stateSet[index.current],
    currentIndex: index.current,
    ...actions
  }
}

export type { UseStateListReturn }
export default useStateList
