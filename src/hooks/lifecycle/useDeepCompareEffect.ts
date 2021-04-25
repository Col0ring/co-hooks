import { DependencyList, EffectCallback } from 'react'
import isEqual from 'lodash/isEqual'
import useCustomCompareEffect from './useCustomCompareEffect'

function useDeepCompareEffect(effect: EffectCallback, deps: DependencyList) {
  useCustomCompareEffect(effect, deps, isEqual)
}

export default useDeepCompareEffect
