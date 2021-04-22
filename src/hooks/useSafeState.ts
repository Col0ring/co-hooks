import { useState } from 'react'
import useUnmountState from './useUnmountedState'

function useSafeState<S>(initialState: S | (() => S)) {
  const isUnmount = useUnmountState()
  const [state, setState] = useState(initialState)
  const setCurrentState: typeof setState = (currentState) => {
    if (isUnmount()) {
      return
    }
    setState(currentState)
  }

  return [state, setCurrentState] as const
}

export default useSafeState
