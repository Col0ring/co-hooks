import { useState, useMemo, useCallback } from 'react'

type UseSetInitialValue<K> = Iterable<K>

function useSet<K>(initialValue?: UseSetInitialValue<K>) {
  const initialSet = useMemo(
    () =>
      (initialValue === undefined
        ? new Set<K>()
        : new Set<K>(initialValue)) as Set<K>,
    []
  )
  const [set, setSet] = useState(initialSet)

  const setActions = useMemo(
    () => ({
      add: (key: K) => {
        setSet((prevSet) => {
          const temp = new Set(prevSet)
          temp.add(key)
          return temp
        })
      },
      remove: (key: K) => {
        setSet((prevSet) => {
          const temp = new Set(prevSet)
          temp.delete(key)
          return temp
        })
      },
      reset: () => setSet(initialSet)
    }),
    [setSet, initialSet]
  )

  const has = useCallback((key) => set.has(key), [set])

  const utils = useMemo(
    () => ({
      has,
      ...setActions
    }),
    [setActions, has]
  )

  return [set, utils] as const
}
export type { UseSetInitialValue }
export default useSet
