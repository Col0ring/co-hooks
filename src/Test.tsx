import React, { useRef } from 'react'
import useFullscreen from './hooks/dom/useFullscreen'
import createGlobalState from './hooks/state/createGlobalState'
import usePageLeave from './hooks/dom/usePageLeave'
import useInViewport from './hooks/dom/useInViewport'
import useElementMouse from './hooks/dom/useElementMouse'
export const useGlobalState = createGlobalState(0)

export default () => {
  const ref = React.useRef(null)
  const { docX, docY, posX, posY, elX, elY, elW, elH } = useElementMouse(ref)

  return (
    <>
      aa
      <div ref={ref}>
        <div>
          Mouse position in document - x:{docX} y:{docY}
        </div>
        <div>
          Mouse position in element - x:{elX} y:{elY}
        </div>
        <div>
          Element position- x:{posX} y:{posY}
        </div>
        <div>
          Element dimensions - {elW}x{elH}
        </div>
      </div>
    </>
  )
}
