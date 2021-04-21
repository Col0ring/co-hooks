import React, {
  memo,
  useEffect,
  useRef,
  useLayoutEffect,
  useMemo,
  useState
} from 'react'
import useModel from './hooks/useModel'
import useReactive from './hooks/useReactive'
const Test: React.FC = () => {
  return (
    <>
      <div>
        <button>Click</button>
      </div>
      <div></div>
    </>
  )
}

export default memo(Test)
