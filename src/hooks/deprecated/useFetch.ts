import React, { useEffect, useRef, useState } from 'react'

type FetchFunction<R, P extends any[] = any[]> = (...args: P) => Promise<R>

interface UseFetchReturn<T> {
  loading: boolean
  err: any
  data: T
}

function useFetch<R, P extends any[] = any[]>(
  request: FetchFunction<R, P>,
  defaultValue: R,
  deps?: React.DependencyList,
  ...args: P
): UseFetchReturn<R> {
  // fetch count
  const countRef = useRef(0)
  const [data, setData] = useState<R>(defaultValue)
  const [err, setErr] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    countRef.current++
    request(...args)
      .then(
        (res) => {
          setData(res)
        },
        (error) => {
          setErr(error)
        }
      )
      .finally(() => {
        countRef.current--
        if (countRef.current === 0) {
          setLoading(false)
        }
      })
  }, deps)

  return {
    data,
    err,
    loading
  }
}

export type { FetchFunction, UseFetchReturn }
export default useFetch
