import useInterval, { UseIntervalReturn } from '../side-effect/useInterval'
import useForceUpdate from '../state/useForceUpdate'

type UseIntervalRenderReturn = UseIntervalReturn<() => void>
function useIntervalRender(ms: number = 0): UseIntervalRenderReturn {
  const forceUpdate = useForceUpdate()
  return useInterval(forceUpdate, ms)
}

export default useIntervalRender
