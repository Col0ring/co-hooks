import React, { useCallback, useMemo, useRef } from 'react'
import useMountedState from '../state/useMountedState'
import useSetState from '../state/useSetState'
import { AsyncFunction } from '../../typings/tools'

interface AsyncState<T> {
  loading: boolean
  err: any
  data?: T
}

type UseAsyncFnReturn<P extends any[], R> = [AsyncState<R>, AsyncFunction<P, R>]

function useAsyncFn<P extends any[] = any[], R = any>(
  asyncFn: AsyncFunction<P, R>,
  deps: React.DependencyList = [],
  initialState: Partial<AsyncState<R>> = {}
): UseAsyncFnReturn<P, R> {
  const defaultState: AsyncState<R> = useMemo(
    () => ({
      loading: initialState.loading || false,
      err: initialState.err || null,
      data: undefined
    }),
    []
  )
  // fetch count
  const countRef = useRef(0)
  const isMounted = useMountedState()
  const [state, setState] = useSetState(defaultState)

  const callbackFn: typeof asyncFn = useCallback((...args) => {
    setState({
      loading: true
    })
    countRef.current++

    return asyncFn(...args)
      .finally(() => {
        countRef.current--
      })
      .then(
        (value) => {
          countRef.current === 0 &&
            isMounted() &&
            setState({
              data: value,
              loading: false
            })
          return value
        },
        (error) => {
          countRef.current === 0 &&
            isMounted() &&
            setState({
              err: error,
              loading: false
            })
          return error
        }
      )
  }, deps)

  return [state, callbackFn]
}

export type { AsyncState, UseAsyncFnReturn }
export default useAsyncFn
