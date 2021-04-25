import { useState } from 'react'

export interface useQueueReturn<T> {
  add: (item: T) => void
  remove: () => T
  first: T
  last: T
  size: number
}

const useQueue = <T>(initialValue: T[] = []): useQueueReturn<T> => {
  const [state, setQueue] = useState(initialValue)
  return {
    add(value) {
      setQueue((queue) => [...queue, value])
    },
    remove() {
      const result = state[0]
      setQueue((queue) => {
        return queue.slice(1)
      })
      return result
    },
    get first() {
      return state[0]
    },
    get last() {
      return state[state.length - 1]
    },
    get size() {
      return state.length
    }
  }
}

export default useQueue
