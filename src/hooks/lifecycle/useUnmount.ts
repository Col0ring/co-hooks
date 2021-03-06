import { useEffect, useRef } from 'react'

function useUnmount(destructor: ReturnType<Parameters<typeof useEffect>[0]>) {
  const fnRef = useRef(destructor)
  fnRef.current = destructor
  useEffect(() => {
    return fnRef.current
  }, [])
}

export default useUnmount
