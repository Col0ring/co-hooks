import { useCallback, useEffect, useState } from 'react'

type DispatchError = (err: Error) => void

function useError(): DispatchError {
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (error) {
      throw error
    }
  }, [error])

  const dispatchError = useCallback((err: Error) => {
    setError(err)
  }, [])

  return dispatchError
}

export default useError
