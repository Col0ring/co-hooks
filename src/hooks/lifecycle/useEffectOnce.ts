import { useEffect } from 'react'

const useEffectOnce = (effect: Parameters<typeof useEffect>[0]) => {
  useEffect(effect, [])
}

export default useEffectOnce
