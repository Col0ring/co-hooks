import { useRef } from 'react'
// 为了避免闭包
function useLatest<T>(value: T) {
  const ref = useRef(value)
  ref.current = value
  return ref as Readonly<typeof ref>
}

export default useLatest
