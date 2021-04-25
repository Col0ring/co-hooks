import { useCallback, useRef } from 'react'

const uniquePrefix = 'unique_key_'
const initialKeyNumber = 0
function useUniqueKey() {
  const keyRef = useRef(initialKeyNumber)
  keyRef.current = initialKeyNumber
  const getUniqueKey = useCallback(() => {
    return uniquePrefix + keyRef.current++
  }, [])

  return getUniqueKey
}

export default useUniqueKey
