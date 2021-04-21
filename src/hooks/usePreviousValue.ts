import { useRef, useMemo } from 'react'

type compareFunction<T> = (prev: T | undefined, next: T) => boolean

function usePreviousValue<T>(
  state: T,
  compare?: compareFunction<T>
): T | undefined {
  const prevRef = useRef<T>()
  const curRef = useRef<T>()
  const needUpdate = useMemo(
    () =>
      typeof compare === 'function' ? compare(prevRef.current, state) : true,
    [compare, state]
  )
  // ahooks，由于 StrictMode 会执行两次，所以应该对当前的值进行一次判断的校验
  //   if (needUpdate) {
  //     prevRef.current = curRef.current
  //     curRef.current = state
  //   }
  /*
    官方做法，但是这样其实只是在页面渲染后再赋值。如果因为其他原因渲染页面值其实已经改了
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
   */
  // 不可以加入 useEffect 里面，因为  curRef.current !== state 永远为 false
  if (needUpdate && curRef.current !== state) {
    prevRef.current = curRef.current
  }

  curRef.current = state

  return prevRef.current
}

export type { compareFunction }
export default usePreviousValue
