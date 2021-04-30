import { MutableRefObject, useCallback, useRef } from 'react'
import useUpdateEffect from '../lifecycle/useUpdateEffect'
import useForceUpdate from './useForceUpdate'

type Dispatch<Action> = (action: Action) => void

interface Store<Action, State> {
  getState: () => State
  dispatch: Dispatch<Action>
}

type Middleware<Action, State> = (
  store: Store<Action, State>
) => (next: Dispatch<Action>) => (action: Action) => void

// 合并中间件
function composeMiddleware<Action, State>(chain: Middleware<Action, State>[]) {
  return (context: Store<Action, State>, dispatch: Dispatch<Action>) => {
    // 先后再前
    return chain.reduceRight((dispatchAction, middleware) => {
      return middleware(context)(dispatchAction)
    }, dispatch)
  }
}

const createReducer = <Action, State>(
  ...middlewares: Middleware<Action, State>[]
) => {
  // 已经合并后的中间件
  const composedMiddleware = composeMiddleware<Action, State>(middlewares)

  // useReducer
  return (
    reducer: (state: State, action: Action) => State,
    initialState: State,
    initializer = (value: State) => value
  ): [State, Dispatch<Action>] => {
    const ref = useRef(initializer(initialState))
    const forceUpdate = useForceUpdate()
    // dispatch origin
    const dispatch = useCallback(
      (action) => {
        // 改变 state
        ref.current = reducer(ref.current, action)
        forceUpdate()
      },
      [reducer, forceUpdate]
    )

    // 真正的 dispatch 对象
    const dispatchRef: MutableRefObject<Dispatch<Action>> = useRef(
      // 向合并后的中间件传入参数
      composedMiddleware(
        {
          getState: () => ref.current,
          dispatch: (action) => dispatchRef.current(action)
        },
        dispatch
      )
    )

    useUpdateEffect(() => {
      // dispatch 更新时改变 dispatchRef
      dispatchRef.current = composedMiddleware(
        {
          getState: () => ref.current,
          dispatch: (action) => dispatchRef.current(action)
        },
        dispatch
      )
    }, [dispatch])

    return [ref.current, dispatchRef.current]
  }
}
export type { Dispatch, Store, Middleware }
export default createReducer
