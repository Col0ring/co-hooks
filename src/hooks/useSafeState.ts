import { useState } from 'react'
import useUnmountState from './useUnmountState'

function useSafeState<S>(initialState: S | (() => S)) {
  const unmount = useUnmountState()
  const [state, setState] = useState(initialState)
  const setCurrentState: typeof setState = (currentState) => {
    if (unmount.current) {
      return
    }
    setState(currentState)
  }

  return [state, setCurrentState] as const
}

export default useSafeState
