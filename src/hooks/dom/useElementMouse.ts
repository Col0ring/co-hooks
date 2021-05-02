import React, { useRef } from 'react'
import useRafState from '../state/useRafState'
import useEventListener from './useEventListener'

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

function useElementMouse(ref: React.RefObject<Element>): UseElementMouseState {
  const documentRef = useRef(document)
  const [state, setState] = useRafState<UseElementMouseState>(initState)
  useEventListener(documentRef, 'mousemove', (event) => {
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
    const elX = event.pageX - posX
    const elY = event.pageY - posY

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
  })

  return state
}
export type { UseElementMouseState }
export default useElementMouse
