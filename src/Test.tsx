import React from 'react'
import createGlobalState from './hooks/state/createGlobalState'
export const useGlobalState = createGlobalState(0)

export default () => {
  const [count, setCount] = useGlobalState()
  return <div>{count}</div>
}
