import { DomElement, DomParam } from '../../typings/tools'
import { getDomElement, nullRef } from '../../utils/tools'
import useRafState from '../state/useRafState'
import useEventListener from './useEventListener'
import useHover from './useHover'
interface UseElementMouseState {
  // 在 document 的位置
  docX: number
  docY: number
  //元素的定位
  posX: number
  posY: number
  // 在元素内部的位置
  elX: number
  elY: number
  elH: number
  elW: number
}

interface UseElementMouseOptions {
  whenHovered?: boolean
  bound?: boolean
}

const initState: UseElementMouseState = {
  docX: NaN,
  docY: NaN,
  posX: NaN,
  posY: NaN,
  elX: NaN,
  elY: NaN,
  elH: NaN,
  elW: NaN
}

function useElementMouse(
  ref: DomParam<Exclude<DomElement, Window | Document>>,
  options: UseElementMouseOptions = {}
): UseElementMouseState {
  const whenHovered = !!options.whenHovered
  const bound = !!options.bound
  const isHovering = useHover(ref)
  const [state, setState] = useRafState<UseElementMouseState>(initState)
  useEventListener(
    whenHovered && !isHovering ? nullRef : document,
    'mousemove',
    (event) => {
      const el = getDomElement(ref)
      if (!el) {
        return
      }
      const { left, top, width: elW, height: elH } = el.getBoundingClientRect()
      const posX = left + window.pageXOffset
      const posY = top + window.pageYOffset
      let elX = event.pageX - posX
      let elY = event.pageY - posY
      if (bound) {
        elX = Math.max(0, Math.min(elX, elW))
        elY = Math.max(0, Math.min(elY, elH))
      }

      setState({
        docX: event.pageX,
        docY: event.pageY,
        posX,
        posY,
        elX,
        elY,
        elH,
        elW
      })
    }
  )

  return state
}
export type { UseElementMouseState }
export default useElementMouse
