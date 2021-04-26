import { useCallback, useState } from 'react'
import Cookies from 'js-cookie'

type CookieState = string | undefined

function useCookieState(
  cookieKey: string,
  initialValue?: CookieState,
  defaultOptions: Cookies.CookieAttributes = {}
) {
  const [state, setState] = useState<CookieState>(() => {
    const cookieValue = Cookies.get(cookieKey)
    if (typeof cookieValue === 'string') {
      cookieValue
    }
    initialValue && Cookies.set(cookieKey, initialValue, defaultOptions)
    return initialValue
  })

  const setItem = useCallback(
    (newValue: string, options?: Cookies.CookieAttributes) => {
      Cookies.set(cookieKey, newValue, options || defaultOptions)
      setState(newValue)
    },
    [cookieKey]
  )

  const removeItem = useCallback(() => {
    Cookies.remove(cookieKey)
    setState(undefined)
  }, [cookieKey])

  return [state, setItem, removeItem] as const
}

export default useCookieState
