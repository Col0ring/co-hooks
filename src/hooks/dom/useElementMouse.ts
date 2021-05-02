import React, { useRef } from 'react'
import { nullRef } from '../../utils/tools'
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
  ref: React.RefObject<Element>,
  options: UseElementMouseOptions = {}
): UseElementMouseState {
  const whenHovered = !!options.whenHovered
  const bound = !!options.bound
  const documentRef = useRef(document)
  const isHovering = useHover(ref)
  const [state, setState] = useRafState<UseElementMouseState>(initState)
  useEventListener(
    whenHovered && !isHovering ? nullRef : documentRef,
    'mousemove',
    (event) => {
      if (!ref.current) {
        return
      }
      const {
        left,
        top,
        width: elW,
        height: elH
      } = ref.current.getBoundingClientRect()
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
