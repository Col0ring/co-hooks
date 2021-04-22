import React from 'react'
import useMethods from './hooks/useMethods'

const initialState = {
  count: 0
}

function createMethods(state: typeof initialState) {
  return {
    reset() {
      return initialState
    },
    increment(c: number, b: string) {
      console.log(c)
      console.log(b)
      return { ...state, count: state.count + 1 }
    },
    decrement() {
      return { ...state, count: state.count - 1 }
    }
  }
}

const Demo = () => {
  const [state, methods] = useMethods(createMethods, initialState)

  return (
    <>
      <p>Count: {state.count}</p>
      <button onClick={methods.decrement}>-</button>
      <button onClick={() => methods.increment(1, '1232')}>+</button>
    </>
  )
}

export default Demo
