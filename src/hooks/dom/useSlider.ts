import { CSSProperties, RefObject, useEffect, useRef } from 'react'
import useMountedState from '../state/useMountedState'
import useSetState from '../state/useSetState'

interface UseSliderState {
  isSliding: boolean
  value: number
}

interface UseSliderOptions {
  onScrub?: (value: number) => void
  onScrubStart?: () => void
  onScrubStop?: (value: number) => void
  reverse?: boolean
  styles?: boolean | CSSProperties
  vertical?: boolean
}

function useSlider(
  ref: RefObject<HTMLElement>,
  options: UseSliderOptions = {}
): UseSliderState {
  const isMounted = useMountedState()
  const isSliding = useRef(false)
  const valueRef = useRef(0)
  const frame = useRef<ReturnType<typeof requestAnimationFrame>>(0)

  const [state, setState] = useSetState<UseSliderState>({
    isSliding: false,
    value: 0
  })
  valueRef.current = state.value

  useEffect(() => {
    if (!ref.current) {
      return
    }
    const styles = options.styles === undefined ? true : options.styles
    // 是否 reverse
    const reverse = options.reverse === undefined ? false : options.reverse

    if (styles) {
      ref.current.style.userSelect = 'none'
    }

    const startScrubbing = () => {
      if (!isSliding.current && isMounted()) {
        options.onScrubStart?.()
        isSliding.current = true
        setState({ isSliding: true })
        bindEvents()
      }
    }

    const stopScrubbing = () => {
      if (isSliding.current && isMounted()) {
        options.onScrubStop?.(valueRef.current)
        isSliding.current = false
        setState({ isSliding: false })
        unbindEvents()
      }
    }

    const onMouseDown = (event: MouseEvent) => {
      startScrubbing()
      onMouseMove(event)
    }
    const onMouseMove = options.vertical
      ? (event: MouseEvent) => onScrub(event.clientY)
      : (event: MouseEvent) => onScrub(event.clientX)

    const onTouchStart = (event: TouchEvent) => {
      startScrubbing()
      onTouchMove(event)
    }
    const onTouchMove = options.vertical
      ? (event: TouchEvent) => onScrub(event.changedTouches[0].clientY)
      : (event: TouchEvent) => onScrub(event.changedTouches[0].clientX)

    const bindEvents = () => {
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', stopScrubbing)
      document.addEventListener('touchmove', onTouchMove)
      document.addEventListener('touchend', stopScrubbing)
    }

    const unbindEvents = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', stopScrubbing)
      document.removeEventListener('touchmove', onTouchMove)
      document.removeEventListener('touchend', stopScrubbing)
    }

    const onScrub = (clientXY: number) => {
      cancelAnimationFrame(frame.current)

      frame.current = requestAnimationFrame(() => {
        if (isMounted() && ref.current) {
          const rect = ref.current.getBoundingClientRect()
          const pos = options.vertical ? rect.top : rect.left
          const length = options.vertical ? rect.height : rect.width

          // Prevent returning 0 when element is hidden by CSS
          if (!length) {
            return
          }

          let value = (clientXY - pos) / length

          if (value > 1) {
            value = 1
          } else if (value < 0) {
            value = 0
          }

          if (reverse) {
            value = 1 - value
          }

          setState({
            value
          })
          options.onScrub?.(value)
        }
      })
    }

    ref.current.addEventListener('mousedown', onMouseDown)
    ref.current.addEventListener('touchstart', onTouchStart)

    return () => {
      ref.current?.removeEventListener('mousedown', onMouseDown)
      ref.current?.removeEventListener('touchstart', onTouchStart)
    }
  }, [ref, options.vertical])

  return state
}

export default useSlider
