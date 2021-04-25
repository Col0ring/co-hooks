import React from 'react'
import useForceUpdate from './hooks/state/useForceUpdate'
import useUniqueKey from './hooks/state/useUniqueKey'
// import { useReactive } from 'ahooks'
import useArray from './hooks/state/useReactive'
const i = {
  bug: '',
  bugs: ['feat', 'fix', 'chore'],
  addBug(bug: string) {
    this.bugs.push(bug)
  },
  get bugsCount() {
    return this.bugs.length
  }
}
const s = [1, 2, 3]
export default () => {
  const state = useArray([1, 2, 3])
  const forceUpdate = useForceUpdate()
  const getUniqueKey = useUniqueKey()

  return (
    <div>
      {state.map((i, index) => {
        return <p key={getUniqueKey()}>{Math.random()}</p>
      })}
      <button onClick={() => state.push(4)}>forceA</button>

      <button onClick={() => forceUpdate()}>force</button>
    </div>
  )
}
