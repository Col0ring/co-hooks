import React, { useRef } from 'react'
import useLongPress from './hooks/dom/useLongPress'
import useVirtualList from './hooks/dom/useVirtualList'
import useIdle from './hooks/dom/useIdle'
import useTimeoutRender from './hooks/lifecycle/useTimeoutRender'
import useIntervalRender from './hooks/lifecycle/useIntervalRender'

export default () => {
  const [value, onChange] = React.useState<number>(0)
  const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(
    Array.from(Array(99999).keys()),
    {
      itemHeight: (i) => (i % 2 === 0 ? 42 + 8 : 84 + 8),
      overscan: 10,
      scrollBehavior: 'smooth'
    }
  )
  const state = useIdle(60e3, false, [
    'mousemove',
    'mousedown',
    'resize',
    'keydown',
    'touchstart',
    'wheel'
  ])
  return (
    <div>
      <div style={{ textAlign: 'right', marginBottom: 16 }}>
        <input
          style={{ width: 120 }}
          placeholder="line number"
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <button
          style={{ marginLeft: 8 }}
          type="button"
          onClick={() => {
            scrollTo(Number(value))
          }}
        >
          scroll to
        </button>
      </div>
      <div {...containerProps} style={{ height: '300px', overflow: 'auto' }}>
        <div {...wrapperProps}>
          {list.map((ele) => (
            <div
              style={{
                height: ele.index % 2 === 0 ? 42 : 84,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid #e8e8e8',
                marginBottom: 8
              }}
              key={ele.index}
            >
              Row: {ele.data} size: {ele.index % 2 === 0 ? 'small' : 'large'}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
