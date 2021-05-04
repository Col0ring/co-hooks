import useForceUpdate from '../state/useForceUpdate'
import useTimeout, { UseTimeoutReturn } from '../side-effect/useTimeout'
type useTimeoutRenderReturn = UseTimeoutReturn<() => void>
// re render after [ms] ms
function useTimeoutRender(ms: number = 0): useTimeoutRenderReturn {
  const forceUpdate = useForceUpdate()
  return useTimeout(forceUpdate, ms)
}

export type { useTimeoutRenderReturn }
export default useTimeoutRender
