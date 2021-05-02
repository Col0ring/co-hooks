import useRafState from '../state/useRafState'
import useEventListener from './useEventListener'

interface UseScrollState {
  x: number
  y: number
}

type ScrollListenController = (val: UseScrollState) => boolean

function isDocument(el: HTMLElement | Document): el is Document {
  return el === document
}

function useScroll(
  ref: React.RefObject<HTMLElement | Document>,
  shouldUpdate: ScrollListenController = () => true
): UseScrollState {
  const [state, setState] = useRafState<UseScrollState>({
    x: NaN,
    y: NaN
  })

  useEventListener(ref, 'scroll', () => {
    if (ref.current) {
      let position: UseScrollState
      if (isDocument(ref.current)) {
        if (!document.scrollingElement) {
          return
        }
        position = {
          x: document.scrollingElement.scrollLeft,
          y: document.scrollingElement.scrollTop
        }
      } else {
        position = {
          x: ref.current.scrollLeft,
          y: ref.current.scrollTop
        }
      }
      shouldUpdate(position) && setState(position)
    }
  })

  return state
}

export type { UseScrollState, ScrollListenController }
export default useScroll
