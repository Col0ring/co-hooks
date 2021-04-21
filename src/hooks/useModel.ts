import { useMemo } from 'react'
import useReactive, { UseReactiveOptions } from './useReactive'
import { props2Arr } from '../utils/tools'

type UseModelOptions<T> = UseReactiveOptions<T>

interface UseModelReturn<T> {
  value: T
}

// function useModel<T>(
//   initial: T,
//   options: UseModelOptions<T> = {}
// ): UseModelReturn<T> {
//   const watchInitial =
//     options.watchInitial !== undefined ? options.watchInitial : true
//   const value = useRef(initial)
//   const forceUpdate = useForceUpdate()
//   const prevValue = usePrevious(initial)

//   const modelValue = useMemo(
//     () => ({
//       get value(): T {
//         return value.current
//       },
//       set value(val: T) {
//         options.onChange?.(val, value.current, ChangeStatus.Set)
//         value.current = val
//         forceUpdate()
//       }
//     }),
//     [options.onChange]
//   )
//   // not re render
//   if (watchInitial && prevValue !== undefined && initial !== prevValue) {
//     options.onChange?.(initial, value.current, ChangeStatus.Initial)
//     value.current = initial
//   }

//   return modelValue
// }

function useModel<T>(
  initial: T,
  options: UseModelOptions<T> = {}
): UseModelReturn<T> {
  const refValue = useMemo(
    () => ({
      value: initial
    }),
    [initial]
  )
  const refOptions = useMemo<UseModelOptions<UseModelReturn<T>>>(
    () => ({
      ...options,
      onChange(value, oldValue, status) {
        options.onChange?.(value.value, oldValue.value, status)
      }
    }),
    [...props2Arr(options)]
  )
  const modelValue = useReactive(refValue, refOptions)

  return modelValue
}

export type { UseModelOptions }
export default useModel
