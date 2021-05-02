import { useRef, useState } from 'react'
import useEventListener from './useEventListener'

type usePageVisibilityState = 'hidden' | 'visible' | 'prerender' | undefined

function usePageVisibility(): usePageVisibilityState {
  const documentRef = useRef(document)
  const [pageVisibility, setPageVisibility] = useState<VisibilityState>(
    () => documentRef.current?.visibilityState || undefined
  )

  useEventListener(documentRef, 'visibilitychange', () => {
    setPageVisibility(documentRef.current.visibilityState)
  })

  return pageVisibility
}

export type { usePageVisibilityState }
export default usePageVisibility
