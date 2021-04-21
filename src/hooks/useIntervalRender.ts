import useInterval from './useInterval'
import useForceUpdate from './useForceUpdate'

function useIntervalRender(ms: number = 0) {
  const forceUpdate = useForceUpdate()
  return useInterval(forceUpdate, ms)
}

export default useIntervalRender
