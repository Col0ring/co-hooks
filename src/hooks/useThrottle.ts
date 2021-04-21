import { useState } from 'react'
import useThrottleFn, { ThrottleOptions } from './useThrottleFn'
import useUpdateEffect from './useUpdateEffect'

function useThrottle<T>(value: T, wait: number = 0, options?: ThrottleOptions) {
  const [throttled, setThrottled] = useState(value)

  const { run } = useThrottleFn(
    () => {
      setThrottled(value)
    },
    wait,
    options
  )
  useUpdateEffect(() => {
    run()
  }, [value])

  return throttled
}
export type { ThrottleOptions }
export default useThrottle
