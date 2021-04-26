import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'

// 第一个参数是是否 valid,实际是通过 validator 的烦值返回一个数组才可以，然后数组里面的其它参数额可以自己控制
export type ValidityState = [boolean | undefined, ...any[]] | [undefined]

export interface StateValidator<V, S> {
  (state: S): V
  // 如果只有一个参数要返回值，如果有两个参数就自己使用 dispatch
  (state: S, dispatch: Dispatch<SetStateAction<V>>): void
}

export type UseStateValidatorReturn<V> = [V, () => void]

function useStateValidator<V extends ValidityState, S>(
  state: S,
  validator: StateValidator<V, S>,
  // 初始化 valid 状态
  initialState: V = [undefined] as V
): UseStateValidatorReturn<V> {
  const validatorInner = useRef(validator)
  const stateInner = useRef(state)

  validatorInner.current = validator
  stateInner.current = state

  const [validity, setValidity] = useState(initialState as V)

  const validate = useCallback(() => {
    // 根据参数值的数量
    if (validatorInner.current.length >= 2) {
      validatorInner.current(stateInner.current, setValidity)
    } else {
      setValidity(validatorInner.current(stateInner.current))
    }
  }, [setValidity])

  useEffect(() => {
    validate()
  }, [state])

  return [validity, validate]
}
export default useStateValidator
