import React, { useRef } from 'react'
import usePrevious from './usePrevious'
import { isSameDeps } from '../utils/tools'

function useMemo<T>(factory: () => T, deps?: React.DependencyList): T {
  const prevDeps = usePrevious(deps)
  const value = useRef<T>()

  if (prevDeps === undefined || (deps && !isSameDeps(prevDeps, deps))) {
    value.current = factory()
  }
  return value.current as T
}

export default useMemo
