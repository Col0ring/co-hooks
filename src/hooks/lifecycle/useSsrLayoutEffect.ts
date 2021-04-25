import { useEffect, useLayoutEffect } from 'react'
import { isBrowser } from '../../utils/tools'

const useSsrLayoutEffect = isBrowser ? useLayoutEffect : useEffect

export default useSsrLayoutEffect
