import { useRef, useCallback } from 'react'
import useUnmount from './useUnmount'
function useUnmountState() {
  const unmountRef = useRef(false)

  const getState = useCallback(() => unmountRef.current, [])

  useUnmount(() => {
    unmountRef.current = true
  })

  return getState
}

export default useUnmountState
