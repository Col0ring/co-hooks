import { useEffect } from 'react'

function useUnmount(destructor: ReturnType<Parameters<typeof useEffect>[0]>) {
  useEffect(() => {
    return destructor
  }, [])
}

export default useUnmount
