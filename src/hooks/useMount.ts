import { useEffect } from 'react'

function useMount(effect: Parameters<typeof useEffect>[0]) {
  useEffect(effect, [])
}

export default useMount
