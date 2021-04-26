import React, { memo } from 'react'
import useCountDown from './hooks/state/useCountDown'
import { useGlobalState } from './Test'
const Test: React.FC = () => {
  const [time, setTargetTime] = useCountDown({
    targetDate: Date.now() + 10000
  })
  const [, setCount] = useGlobalState()
  return (
    <>
      <div>
        <button
          onClick={() => {
            setCount((count) => count + 1)
          }}
        >
          Click
        </button>
      </div>
    </>
  )
}

export default memo(Test)
