import useUnmount from './useUnmount'
import useMount from './useMount'
import useUpdateEffect from './useUpdateEffect'

function useLogger(componentName: string, ...rest: any[]) {
  useMount(() => {
    console.log(`${componentName} mounted`, ...rest)
  })
  useUnmount(() => {
    console.log(`${componentName} unmounted`)
  })
  useUpdateEffect(() => {
    console.log(`${componentName} updated`, ...rest)
  })
}

export default useLogger
