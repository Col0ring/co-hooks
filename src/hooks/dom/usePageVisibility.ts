import { useState } from 'react'
import useEventListener from './useEventListener'

type usePageVisibilityState = 'hidden' | 'visible' | 'prerender' | undefined

function usePageVisibility(): usePageVisibilityState {
  const [pageVisibility, setPageVisibility] = useState<VisibilityState>(
    () => document.visibilityState || undefined
  )

  useEventListener(document, 'visibilitychange', () => {
    setPageVisibility(document.visibilityState)
  })

  return pageVisibility
}

export type { usePageVisibilityState }
export default usePageVisibility
