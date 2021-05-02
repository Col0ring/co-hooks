import React, { memo } from 'react'
import useCountDown from './hooks/state/useCountDown'
const Test: React.FC = () => {
  const [time, setTargetTime] = useCountDown({
    targetDate: Date.now() + 10000
  })
  return (
    <>
      <div>
        <button>Click</button>
      </div>
    </>
  )
}

export default memo(Test)
