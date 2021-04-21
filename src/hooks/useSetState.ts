import { useCallback, useState } from 'react'
import { isFunction } from '../utils/tools'
import { ObjectKeysPartial, FunctionReturnPartial } from '../typings/tools'

type setMergeStateParamsTool<T> = {
  [K in keyof T]: ObjectKeysPartial<FunctionReturnPartial<T[K]>>
}
type SetMergeStateTool<T> = T extends (...args: infer P) => infer R
  ? (...args: setMergeStateParamsTool<P>) => R
  : T

function useSetState<S extends GlobalObject>(initial: S | (() => S)) {
  const [state, setState] = useState(initial)
  const setMergeState: SetMergeStateTool<typeof setState> = useCallback(
    (currentState) => {
      if (isFunction(currentState)) {
        setState((prevState) => ({ ...prevState, ...currentState(prevState) }))
      } else {
        setState((prevState) => ({ ...prevState, ...currentState }))
      }
    },
    []
  )

  return [state, setMergeState] as const
}

export default useSetState
