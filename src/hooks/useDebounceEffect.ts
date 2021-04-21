// import React, { useEffect, useState } from 'react'
// import useDebounce, { DebounceOptions } from './useDebounce'
// import useUpdateEffect from './useUpdateEffect'

// function useDebounceEffect(
//   effect: React.EffectCallback,
//   deps?: React.DependencyList,
//   wait: number = 0,
//   options?: DebounceOptions
// ) {
//   const [update, setUpdate] = useState(false)
//   const debouncedUpdate = useDebounce(update, wait, options)
//   useEffect(() => {
//     setUpdate((state) => !state)
//   }, deps)
//   useUpdateEffect(effect, [debouncedUpdate])
// }

import React, { useEffect } from 'react'
import useDebounceFn, { DebounceOptions } from './useDebounceFn'

function useDebounceEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList,
  wait: number = 0,
  options?: DebounceOptions
) {
  const { run } = useDebounceFn(effect, wait, options)
  useEffect(() => {
    // do not need to cancel
    run()
  }, deps)
}
export default useDebounceEffect
