import { useCallback, useRef } from 'react'

function usePersistFn<T extends GlobalFunction>(fn: T): T {
  const fnRef = useRef(fn)
  fnRef.current = fn
  return useCallback(
    function (this: GlobalObject, ...args) {
      return fnRef.current.call(this, ...args)
    } as T,
    []
  )
}

export default usePersistFn
