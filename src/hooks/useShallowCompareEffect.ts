import React from 'react'
import useCustomCompareEffect from './useCustomCompareEffect'
import { isShallowEqual } from '../utils/tools'

function shallowEqualDepsList(
  prevDeps: React.DependencyList,
  nextDeps: React.DependencyList
) {
  return prevDeps.every((dep, index) => isShallowEqual(dep, nextDeps[index]))
}

function useShallowCompareEffect(
  effect: React.EffectCallback,
  deps: React.DependencyList
) {
  useCustomCompareEffect(effect, deps, shallowEqualDepsList)
}

export default useShallowCompareEffect
