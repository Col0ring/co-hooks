import { useState } from 'react'
import useDebounceFn, { DebounceOptions } from './useDebounceFn'
import useUpdateEffect from './useUpdateEffect'

function useDebounce<T>(value: T, wait: number = 0, options?: DebounceOptions) {
  const [debounced, setDebounced] = useState(value)

  const { run } = useDebounceFn(
    () => {
      setDebounced(value)
    },
    wait,
    options
  )
  useUpdateEffect(() => {
    run()
  }, [value])

  return debounced
}
export type { DebounceOptions }
export default useDebounce
