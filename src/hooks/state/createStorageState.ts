import { Dispatch, SetStateAction, useCallback, useState, useMemo } from 'react'
import { isBrowser, noop } from '../../utils/tools'
import useSsrLayoutEffect from '../lifecycle/useSsrLayoutEffect'
import usePersistFn from './usePersistFn'

type parserOptions<T> =
  | {
      raw: true
    }
  | {
      raw: false
      serializer: (value: T) => string
      deserializer: (value: string) => T
    }

type useStorageReturn<T> = [
  T | undefined,
  Dispatch<SetStateAction<T | undefined>>,
  () => void
]

function createStorageState(storage: Storage) {
  return function useStorage<T>(
    key: string,
    initialValue?: T,
    options?: parserOptions<T>
  ): useStorageReturn<T> {
    if (!isBrowser) {
      return [initialValue as T, noop, noop]
    }
    if (!key) {
      throw new Error('key may not be falsy')
    }

    const deserializer = useMemo(
      () =>
        options
          ? options.raw
            ? (value: string) => value
            : options.deserializer
          : JSON.parse,
      Object.values(options || {})
    )

    const initializer = usePersistFn((key: string) => {
      try {
        const serializer = options
          ? options.raw
            ? String
            : options.serializer
          : JSON.stringify

        const storageValue = storage.getItem(key)
        if (storageValue !== null) {
          return deserializer(storageValue)
        } else {
          initialValue && storage.setItem(key, serializer(initialValue))
          return initialValue
        }
      } catch {
        // If user is in private mode or has storage restriction
        // storage can throw. JSON.parse and JSON.stringify
        // can throw, too.
        return initialValue
      }
    })

    const [state, setState] = useState<T | undefined>(() => initializer(key))

    const setItem: typeof setState = useCallback(
      (valOrFunc) => {
        try {
          const newState =
            typeof valOrFunc === 'function'
              ? (valOrFunc as Function)(state)
              : valOrFunc
          if (typeof newState === 'undefined') {
            return
          }
          let value: string
          if (options) {
            if (options.raw) {
              if (typeof newState === 'string') {
                value = newState
              } else {
                value = JSON.stringify(newState)
              }
            } else if (options.serializer) {
              value = options.serializer(newState)
            } else {
              value = JSON.stringify(newState)
            }
          } else {
            value = JSON.stringify(newState)
          }

          storage.setItem(key, value)
          setState(deserializer(value))
        } catch {
          // If user is in private mode or has storage restriction
          // storage can throw. Also JSON.stringify can throw.
        }
      },
      [key, setState]
    )

    const removeItem = useCallback(() => {
      try {
        storage.removeItem(key)
        setState(undefined)
      } catch {
        // If user is in private mode or has storage restriction
        // storage can throw.
      }
    }, [key, setState])
    // key 变了要重新设置
    useSsrLayoutEffect(() => setState(initializer(key)), [key])

    return [state, setItem, removeItem]
  }
}

export default createStorageState
