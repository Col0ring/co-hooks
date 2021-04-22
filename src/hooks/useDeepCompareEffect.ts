import { DependencyList, EffectCallback } from 'react'
import isEqual from 'lodash/isEqual'
import useCustomCompareEffect from './useCustomCompareEffect'

const useDeepCompareEffect = (effect: EffectCallback, deps: DependencyList) => {
  useCustomCompareEffect(effect, deps, isEqual)
}

export default useDeepCompareEffect
