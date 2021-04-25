import useInterval from '../side-effect/useInterval'
import useForceUpdate from '../state/useForceUpdate'

function useIntervalRender(ms: number = 0) {
  const forceUpdate = useForceUpdate()
  return useInterval(forceUpdate, ms)
}

export default useIntervalRender
