import { useCallback, useEffect, useRef, useState } from 'react'
import {
  StateValidator,
  UseStateValidatorReturn,
  ValidityState
} from './useStateValidator'

type MultiStateValidatorStates =
  | any[]
  | { [p: string]: any }
  | { [p: number]: any }

type MultiStateValidator<
  V extends ValidityState,
  S extends MultiStateValidatorStates
> = StateValidator<V, S>

function useMultiStateValidator<
  V extends ValidityState,
  S extends MultiStateValidatorStates
>(
  states: S,
  validator: MultiStateValidator<V, S>,
  initialValidity: V = [undefined] as V
): UseStateValidatorReturn<V> {
  if (typeof states !== 'object' || states === null) {
    throw new Error(
      'states expected to be an object or array, got ' + typeof states
    )
  }

  const validatorInner = useRef(validator)
  const statesInner = useRef(states)

  validatorInner.current = validator
  statesInner.current = states

  const [validity, setValidity] = useState(initialValidity as V)

  const validate = useCallback(() => {
    if (validatorInner.current.length >= 2) {
      validatorInner.current(statesInner.current, setValidity)
    } else {
      setValidity((validatorInner.current as any)(statesInner.current))
    }
  }, [setValidity])

  useEffect(() => {
    validate()
  }, Object.values(states))

  return [validity, validate]
}

export type { MultiStateValidatorStates, MultiStateValidator }
export default useMultiStateValidator
