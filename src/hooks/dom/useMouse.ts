import React, { useState } from 'react'
import { DomElement } from '../../typings/tools'
import useEventListener from './useEventListener'

interface UseMouseState {
  // 距离显示器左侧的距离
  screenX: number
  screenY: number
  // 距离当前视窗左侧的距离
  clientX: number
  clientY: number
  // 距离完整页面顶部的距离
  pageX: number
  pageY: number
}

const initState: UseMouseState = {
  screenX: NaN,
  screenY: NaN,
  clientX: NaN,
  clientY: NaN,
  pageX: NaN,
  pageY: NaN
}

function useMouse(ref: React.RefObject<DomElement>) {
  const [state, setState] = useState(initState)

  useEventListener(ref, 'mousemove', (event) => {
    const { screenX, screenY, clientX, clientY, pageX, pageY } = event
    setState({ screenX, screenY, clientX, clientY, pageX, pageY })
  })

  return state
}

export type { UseMouseState }
export default useMouse
