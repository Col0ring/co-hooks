import {
  createContext,
  createElement,
  useContext,
  useMemo,
  useState
} from 'react'

type StateContextValue<T> =
  | [T, React.Dispatch<React.SetStateAction<T>>]
  | undefined

const createStateContext = <T>(defaultInitialValue: T) => {
  const context = createContext<StateContextValue<T>>(undefined)
  // 可复用

  const providerFactory = (
    props: React.ProviderProps<StateContextValue<T>>,
    children: Parameters<typeof createElement>[2]
  ) => createElement(context.Provider, props, children)

  const StateProvider: React.FC<{ initialValue?: T }> = ({
    children,
    initialValue
  }) => {
    const state = useState<T>(
      initialValue !== undefined ? initialValue : defaultInitialValue
    )
    const memoState = useMemo(() => ({ value: state }), [state])
    return providerFactory(memoState, children)
  }

  function useStateContext() {
    const state = useContext(context)
    if (state === null) {
      throw new Error(`useStateContext must be used inside a StateProvider.`)
    }
    return state
  }

  return [useStateContext, StateProvider, context] as const
}
export type { StateContextValue }
export default createStateContext
