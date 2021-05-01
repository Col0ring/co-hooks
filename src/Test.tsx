import React, { useRef } from 'react'
import useFullscreen from './hooks/dom/useFullscreen'
import createGlobalState from './hooks/state/createGlobalState'
export const useGlobalState = createGlobalState(0)

export default () => {
  const ref = useRef<HTMLDivElement>(null)
  const [state, { toggleFull }] = useFullscreen(ref)
  const [count, setCount] = useGlobalState()
  return (
    <div ref={ref}>
      {state + ''}
      <button onClick={toggleFull}>Click</button>
    </div>
  )
}
