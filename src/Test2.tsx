import React, { memo } from 'react'
import useCountDown from './hooks/useCountDown'
const Test: React.FC = () => {
  const [time, setTargetTime] = useCountDown({
    targetDate: Date.now() + 10000
  })
  return (
    <>
      <div>
        <button
          onClick={() => {
            setTargetTime(Date.now() + 20000)
          }}
        >
          Click
        </button>
      </div>
      <div>{time}</div>
    </>
  )
}

export default memo(Test)
