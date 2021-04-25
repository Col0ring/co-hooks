import { useMemo, useCallback, useRef } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import useForceUpdate from './useForceUpdate'
import usePrevious from './usePrevious'
import { isObject } from '../utils/tools'
enum ChangeStatus {
  Initial = 'initial',
  Set = 'set',
  Delete = 'delete'
}

interface UseReactiveOptions<T> {
  onChange?: (
    value: T,
    oldValue: T,
    status: 'initial' | 'set' | 'delete'
  ) => void
}

// // k:v 原对象:克隆对象
// const cloneMap = new WeakMap()
// // k:v 原对象:代理过的对象
// const proxyMap = new WeakMap()
// // k:v 代理过的对象:原对象
// const rawMap = new WeakMap()

// function useReactive<T extends object>(
//   initial: T,
//   options: UseReactiveOptions<T> = {}
// ): T {
//   const watchInitial =
//     options.watchInitial !== undefined ? options.watchInitial : true
//   const prevTarget = usePrevious(initial)
//   const currentTarget = useRef(initial)
//   const forceUpdate = useForceUpdate()
//   const reactive = useCallback(
//     (reactiveTarget: T): T => {
//       const existingProxy = proxyMap.get(reactiveTarget)
//       // Add cache to prevent rebuilding proxy
//       if (existingProxy) {
//         return existingProxy
//       }
//       // prevent proxy object have already been proxied
//       if (rawMap.has(reactiveTarget)) {
//         return reactiveTarget
//       }

//       const observer = new Proxy(reactiveTarget, {
//         get(target, key) {
//           const res = Reflect.get(target, key)
//           // deep listen
//           return isObject(res) ? reactive(res) : res
//         },
//         set(target, key, val) {
//           try {
//             Reflect.set(target, key, val)
//             options.onChange?.(currentTarget.current, initial, ChangeStatus.Set)
//             forceUpdate()
//             return true
//           } catch {
//             return false
//           }
//         },
//         deleteProperty(target, key) {
//           const res = Reflect.deleteProperty(target, key)
//           options.onChange?.(
//             currentTarget.current,
//             initial,
//             ChangeStatus.Delete
//           )
//           forceUpdate()
//           return res
//         }
//       })
//       // add cache
//       proxyMap.set(reactiveTarget, observer)
//       rawMap.set(observer, reactiveTarget)
//       return observer
//     },
//     [forceUpdate, initial, options.onChange]
//   )

//   const modelValue = useMemo(() => {
//     let cloneObject = cloneMap.get(initial)
//     if (!cloneObject) {
//       cloneObject = cloneDeep(initial)
//     }

//     currentTarget.current = cloneObject
//     return reactive(cloneObject)
//   }, [initial])

//   if (watchInitial && prevTarget !== undefined && prevTarget !== initial) {
//     options.onChange?.(initial, prevTarget, ChangeStatus.Initial)
//   }
//   return modelValue
// }

// deep clone,no need to cache global data
function useReactive<T extends object>(
  initial: T,
  options: UseReactiveOptions<T> = {}
): T {
  const currentTarget = useRef(initial)
  const forceUpdate = useForceUpdate()
  const reactive = useCallback(
    (reactiveTarget: T): T => {
      const observer = new Proxy(reactiveTarget, {
        get(target, key) {
          const res = Reflect.get(target, key)
          // deep listen
          return isObject(res) ? reactive(res) : res
        },
        set(target, key, val) {
          const res = Reflect.set(target, key, val)
          if (res) {
            options.onChange?.(currentTarget.current, initial, ChangeStatus.Set)
            forceUpdate()
          }
          return res
        },

        deleteProperty(target, key) {
          const res = Reflect.deleteProperty(target, key)
          if (res) {
            options.onChange?.(
              currentTarget.current,
              initial,
              ChangeStatus.Delete
            )
            forceUpdate()
          }
          return res
        }
      })
      return observer
    },
    [forceUpdate, options.onChange]
  )

  const modelValue = useMemo(() => {
    currentTarget.current = cloneDeep(initial)
    return reactive(currentTarget.current)
  }, [])

  return modelValue
}

export type { UseReactiveOptions }
export default useReactive
