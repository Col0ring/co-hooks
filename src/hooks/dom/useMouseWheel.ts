import { useState } from 'react'
import useEventListener from './useEventListener'

function useMouseWheel() {
  const [mouseWheelScrolled, setMouseWheelScrolled] = useState(0)

  useEventListener(window, 'wheel', (e) => {
    setMouseWheelScrolled(e.deltaY + mouseWheelScrolled)
  })

  return mouseWheelScrolled
}

export default useMouseWheel
