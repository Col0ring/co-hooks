import React, { useEffect } from 'react'
import useThrottleFn, { ThrottleOptions } from '../side-effect/useThrottleFn'

function useThrottleEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList,
  wait: number = 0,
  options?: ThrottleOptions
) {
  const { run } = useThrottleFn(effect, wait, options)
  useEffect(() => {
    // do not need to cancel
    run()
  }, deps)
}
export default useThrottleEffect
