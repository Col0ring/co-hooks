import React, { memo, useState } from 'react'
import useModel from './hooks/useModel'
import useReactive from './hooks/useReactive'
import usePrevious from './hooks/usePrevious'
import useDebounceEffect from './hooks/useDebounceEffect'
import useSetState from './hooks/useSetState'
const initial = {
  a: {
    a: {
      a: 1
    }
  }
}
const Test: React.FC = () => {
  const [state, setState] = useSetState({ a: 1, b: 2 })
  const [v, setV] = useState(initial)
  const p0 = usePrevious({
    a: {
      a: {
        a: 1
      }
    }
  })
  const p1 = usePrevious(p0)
  const p2 = usePrevious(p1)
  return (
    <>
      <div>
        <button
          onClick={() =>
            setState({
              a: state.a + 1
            })
          }
        >
          +1
        </button>
        <button
          onClick={() =>
            setV({
              a: {
                a: {
                  a: v.a.a.a + 1
                }
              }
            })
          }
        >
          +v
        </button>
      </div>
      <div>
        {state.a},,,,
        {p0?.a.a.a},{p1?.a.a.a},{p2?.a.a.a}
      </div>
    </>
  )
}

export default memo(Test)
