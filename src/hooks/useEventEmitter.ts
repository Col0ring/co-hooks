import { useRef, useEffect } from 'react'

type Subscription<T> = (val: T) => void

class EventEmitter<T> {
  private subscriptions = new Set<Subscription<T>>()

  emit(val: T) {
    for (const subscription of this.subscriptions) {
      subscription(val)
    }
  }

  useSubscription(callback: Subscription<T>) {
    const callbackRef = useRef<Subscription<T>>()
    callbackRef.current = callback
    useEffect(() => {
      function subscription(val: T) {
        if (callbackRef.current) {
          callbackRef.current(val)
        }
      }
      this.subscriptions.add(subscription)
      return () => {
        this.subscriptions.delete(subscription)
      }
    }, [])
  }
}

function useEventEmitter<T = void>() {
  const ref = useRef<EventEmitter<T>>()
  if (!ref.current) {
    ref.current = new EventEmitter()
  }
  return ref.current
}

export type { Subscription }
export { EventEmitter }
export default useEventEmitter
