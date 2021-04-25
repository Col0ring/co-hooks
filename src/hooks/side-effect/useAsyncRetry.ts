import React, { useCallback, useState } from 'react'
import { AsyncFunction } from '../../typings/tools'
import useAsync, { AsyncState } from './useAsync'

type UseAsyncRetryReturn<T> = [state: AsyncState<T>, retry: () => void]

function useAsyncRetry<P extends any[] = [], R = any>(
  asyncFn: AsyncFunction<P, R>,
  deps: React.DependencyList = [],
  initialState: Partial<AsyncState<R>> = {},
  ...args: P
): UseAsyncRetryReturn<R> {
  const [update, forceUpdate] = useState(false)
  const state = useAsync(asyncFn, [...deps, update], initialState, ...args)

  const retry = useCallback(() => {
    if (state.loading) {
      return
    }
    forceUpdate((state) => !state)
  }, [...deps, state.loading])

  return [state, retry]
}

export type { UseAsyncRetryReturn }
export default useAsyncRetry
