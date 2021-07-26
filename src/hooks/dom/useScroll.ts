import { DomElement, DomParam } from '../../typings/tools'
import { getDomElement } from '../../utils/tools'
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
  ref: DomParam<Extract<DomElement, HTMLElement | Document>>,
  shouldUpdate: ScrollListenController = () => true
): UseScrollState {
  const [state, setState] = useRafState<UseScrollState>({
    x: NaN,
    y: NaN
  })

  useEventListener(ref, 'scroll', () => {
    const el = getDomElement(ref)
    if (el) {
      let position: UseScrollState
      if (isDocument(el)) {
        if (!document.scrollingElement) {
          return
        }
        position = {
          x: document.scrollingElement.scrollLeft,
          y: document.scrollingElement.scrollTop
        }
      } else {
        position = {
          x: el.scrollLeft,
          y: el.scrollTop
        }
      }
      shouldUpdate(position) && setState(position)
    }
  })

  return state
}

export type { UseScrollState, ScrollListenController }
export default useScroll
