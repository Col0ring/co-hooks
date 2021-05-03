import { useEffect } from 'react'

function useBeforeUnload(
  message?: string,
  enabled: boolean | (() => boolean) = true
) {
  useEffect(() => {
    const finalEnabled = typeof enabled === 'function' ? enabled() : enabled
    if (!finalEnabled) {
      return
    }
    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      if (message) {
        event.returnValue = message
      }
      return message
    }

    window.addEventListener('beforeunload', handler)

    return () => window.removeEventListener('beforeunload', handler)
  }, [enabled])
}

export default useBeforeUnload
