import { useRef } from 'react'
import useUnmount from './useUnmount'
function useUnmountState() {
  const isUnmount = useRef(false)

  useUnmount(() => {
    isUnmount.current = true
  })

  return isUnmount
}

export default useUnmountState
