import { useState } from 'react'
import { isShallowEqual } from '../../utils/tools'
import useEventListener from './useEventListener'
const initialBreakPoint = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
}

function calculate<T extends Record<string, number>>(
  breakpoints: T
): Record<keyof T, boolean> {
  return Object.keys(breakpoints).reduce((prev, key: keyof T) => {
    if (typeof window !== 'undefined' && window.innerWidth > breakpoints[key]) {
      prev[key] = true
    } else {
      prev[key] = false
    }
    return prev
  }, {} as Record<keyof T, boolean>)
}

function createBreakpoint<
  T extends Record<string, number> = typeof initialBreakPoint
>(breakpoints: T = initialBreakPoint as unknown as T) {
  return function useBreakpoint(): Record<keyof T, boolean> {
    const [state, setState] = useState(() => calculate(breakpoints))

    // listener
    useEventListener(window, 'resize', () => {
      const newState = calculate(breakpoints)
      if (!isShallowEqual(state, newState)) {
        setState(newState)
      }
    })

    return state
  }
}
export { initialBreakPoint }
export default createBreakpoint
