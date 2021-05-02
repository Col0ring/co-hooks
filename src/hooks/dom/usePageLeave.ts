import React, { useEffect } from 'react'

const usePageLeave = (
  onPageLeave: () => void,
  deps: React.DependencyList = []
) => {
  useEffect(() => {
    if (!onPageLeave) {
      return
    }

    const handler = (event: MouseEvent) => {
      const from = event.relatedTarget
      if (!from) {
        onPageLeave()
      }
    }
    document.addEventListener('mouseout', handler)

    return () => {
      document.removeEventListener('mouseout', handler)
    }
  }, deps)
}

export default usePageLeave
