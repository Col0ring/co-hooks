import React, { useEffect, useRef, useState } from 'react'
import { DomElement } from '../../typings/tools'

interface RectProps {
  top: number
  left: number
  bottom: number
  right: number
  height: number
  width: number
}
interface UseTextSelectionState extends RectProps {
  text: string
}

const initRect: RectProps = {
  top: NaN,
  left: NaN,
  bottom: NaN,
  right: NaN,
  height: NaN,
  width: NaN
}

const initState: UseTextSelectionState = {
  text: '',
  ...initRect
}

function getRectFromSelection(selection: Selection | null): RectProps {
  if (!selection) {
    return initRect
  }

  if (selection.rangeCount < 1) {
    return initRect
  }

  const range = selection.getRangeAt(0)
  const {
    height,
    width,
    top,
    left,
    right,
    bottom
  } = range.getBoundingClientRect()
  return {
    height,
    width,
    top,
    left,
    right,
    bottom
  }
}

const documentRef: React.RefObject<Document> = {
  current: document
}

/**
 * 获取用户选取的文本或当前光标插入的位置
 * */
function useTextSelection(
  ref: React.RefObject<DomElement> = documentRef
): UseTextSelectionState {
  const [state, setState] = useState<UseTextSelectionState>(initState)

  useEffect(() => {
    if (!ref.current || !window.getSelection) {
      return
    }
    const { current: el } = ref

    const mouseupHandler = () => {
      // 获取选贼到的文字
      const selection = window.getSelection()
      const text = selection ? selection.toString() : ''
      if (text) {
        const rect = getRectFromSelection(selection)
        setState({ text, ...rect })
      }
    }

    // 任意点击都需要清空之前的 range
    const mousedownHandler = () => {
      setState((preState) => {
        if (preState.text) {
          return { ...initState }
        }
        return preState
      })
      const selection = window.getSelection()
      if (!selection) {
        return
      }
      selection.removeAllRanges()
    }

    el.addEventListener('mouseup', mouseupHandler)

    document.addEventListener('mousedown', mousedownHandler)

    return () => {
      el.removeEventListener('mouseup', mouseupHandler)
      document.removeEventListener('mousedown', mousedownHandler)
    }
  }, [ref])

  return state
}

export type { RectProps, UseTextSelectionState }
export default useTextSelection
