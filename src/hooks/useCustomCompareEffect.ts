import React, { useEffect, useRef } from 'react'

type DepsEqualFn = (
  prevDeps: React.DependencyList,
  nextDeps: React.DependencyList
) => boolean

function useCustomCompareEffect(
  effect: Parameters<typeof useEffect>[0],
  deps: React.DependencyList,
  depsEqual: DepsEqualFn
) {
  const ref = useRef<React.DependencyList>(deps)

  if (!depsEqual(deps, ref.current)) {
    ref.current = deps
  }

  useEffect(effect, ref.current)
}

export default useCustomCompareEffect
