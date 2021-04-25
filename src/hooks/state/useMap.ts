import { useMemo, useState, useCallback } from 'react'

type UseMapInitialValue<K, T> = Iterable<readonly [K, T]>

function useMap<K, T>(initialValue?: UseMapInitialValue<K, T>) {
  const initialMap = useMemo(
    () =>
      initialValue === undefined
        ? new Map<K, T>()
        : new Map<K, T>(initialValue),
    []
  )
  const [map, setMap] = useState(initialMap)

  const mapActions = useMemo(
    () => ({
      set: (key: K, entry: T) => {
        setMap((prev) => {
          const temp = new Map(prev)
          temp.set(key, entry)
          return temp
        })
      },
      setAll: (newMap: UseMapInitialValue<K, T>) => {
        setMap(new Map(newMap))
      },
      remove: (key: K) => {
        setMap((prev) => {
          const temp = new Map(prev)
          temp.delete(key)
          return temp
        })
      },
      reset: () => setMap(initialMap)
    }),
    [setMap, initialMap]
  )

  const get = useCallback((key) => map.get(key), [map])

  const utils = useMemo(
    () => ({
      get,
      ...mapActions
    }),
    [mapActions, get]
  )

  return [map, utils] as const
}
export type { UseMapInitialValue }
export default useMap
