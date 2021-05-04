import React, { useEffect, useRef } from 'react'
import { diffTwoDeps } from '../../utils/tools'

type TrackedEffectCallback = (
  changes: number[],
  previousDeps?: React.DependencyList,
  deps?: React.DependencyList
) => void

const useTrackedEffect = (
  effect: TrackedEffectCallback,
  deps?: React.DependencyList
) => {
  const previousDepsRef = useRef<React.DependencyList>()

  useEffect(() => {
    let changes = diffTwoDeps(previousDepsRef.current, deps)
    const previousDeps = previousDepsRef.current
    previousDepsRef.current = deps
    return effect(changes, previousDeps, deps)
  }, deps)
}

export default useTrackedEffect
