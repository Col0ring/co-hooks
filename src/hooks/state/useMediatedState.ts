import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react'

// TODO: type
// 有中间状态 transform
interface StateMediator<S, R> {
  //   (newState: S): R
  //   (newState: S, dispatch: Dispatch<SetStateAction<R>>): void
  (newState: S, dispatch: Dispatch<SetStateAction<R>>): R | void
}

type UseMediatedStateReturn<S, R> = [R, Dispatch<S>]

function useMediatedState<S, R>(
  mediator: StateMediator<S, R>,
  initialState?: R
): UseMediatedStateReturn<S, R> {
  const mediatorFn = useRef(mediator)
  mediatorFn.current = mediator
  const [state, setMediatedState] = useState<R>(initialState as R)

  const setState = useCallback(
    // 拿不到以前的 state，这里就只能传入值了
    (newState: S) => {
      if (mediatorFn.current.length === 2) {
        // 自己 setState
        mediatorFn.current(newState, setMediatedState)
      } else {
        setMediatedState((mediatorFn.current as any)(newState))
      }
    },
    [setMediatedState]
  )

  return [state, setState]
}

export type { StateMediator, UseMediatedStateReturn }
export default useMediatedState
