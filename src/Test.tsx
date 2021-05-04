import React from 'react'
import useSlider from './hooks/dom/useSlider'

const Demo = () => {
  const ref = React.useRef<HTMLDivElement>(null)
  const { isSliding, value } = useSlider(ref, {})

  return (
    <div>
      <div ref={ref} style={{ position: 'relative' }}>
        <p style={{ textAlign: 'center', color: isSliding ? 'red' : 'green' }}>
          {Math.round(value * 100)}%
        </p>
        <div style={{ position: 'absolute', left: value * 100 }}>🎚</div>
      </div>
    </div>
  )
}

export default Demo
