import { useMemo } from 'react'
import useToggle from './useToggle'

interface useBooleanActions {
  setTrue: () => void
  setFalse: () => void
  toggle: (value?: boolean | undefined) => void
}

function useBoolean(defaultValue = false): [boolean, useBooleanActions] {
  const [state, { toggle }] = useToggle(defaultValue)

  const actions: useBooleanActions = useMemo(() => {
    const setTrue = () => toggle(true)
    const setFalse = () => toggle(false)
    return { toggle, setTrue, setFalse }
  }, [toggle])

  return [state, actions]
}

export type { useBooleanActions }
export default useBoolean
