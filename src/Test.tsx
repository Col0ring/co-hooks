import React, { useRef } from 'react'
import useSize from './hooks/dom/useSize'
export default () => {
  const ref = useRef<HTMLDivElement>(null)
  const { width } = useSize(ref)
  return (
    <div style={{ width: '100%' }} ref={ref}>
      {width}
    </div>
  )
}
