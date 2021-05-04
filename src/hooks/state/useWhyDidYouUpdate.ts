import { useEffect, useRef } from 'react'
import { Key } from '../../typings/tools'

function useWhyDidYouUpdate(componentName: string, props: Record<Key, any>) {
  const prevProps = useRef<Record<Key, any>>({})

  useEffect(() => {
    if (prevProps.current) {
      const allKeys = Object.keys({ ...prevProps.current, ...props })
      const changedProps: Record<Key, any> = {}

      allKeys.forEach((key) => {
        if (prevProps.current![key] !== props[key]) {
          changedProps[key] = {
            from: prevProps.current![key],
            to: props[key]
          }
        }
      })

      if (Object.keys(changedProps).length) {
        console.log('[why-did-you-update]', componentName, changedProps)
      }
    }
    prevProps.current = props
  })
}

export default useWhyDidYouUpdate
