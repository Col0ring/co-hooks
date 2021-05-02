import { useRef, useState } from 'react'
import useEventListener from './useEventListener'

function useMouseWheel() {
  const windowRef = useRef(window)
  const [mouseWheelScrolled, setMouseWheelScrolled] = useState(0)

  useEventListener(windowRef, 'wheel', (e) => {
    setMouseWheelScrolled(e.deltaY + mouseWheelScrolled)
  })

  return mouseWheelScrolled
}

export default useMouseWheel
