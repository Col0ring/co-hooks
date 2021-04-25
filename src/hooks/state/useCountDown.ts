import { useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import usePersistFn from './usePersistFn'
export type TargetDate = Date | number | string | undefined

export type UseCountdownOptions = {
  targetDate?: TargetDate
  interval?: number
  onEnd?: () => void
}

export interface FormattedResult {
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}

// 计算剩余时间
function calcLeft(t?: TargetDate) {
  if (!t) {
    return 0
  }
  // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
  const left = dayjs(t).valueOf() - new Date().getTime()
  if (left < 0) {
    return 0
  }
  return left
}

// 转换 result
function parseMs(milliseconds: number): FormattedResult {
  return {
    days: Math.floor(milliseconds / 86400000),
    hours: Math.floor(milliseconds / 3600000) % 24,
    minutes: Math.floor(milliseconds / 60000) % 60,
    seconds: Math.floor(milliseconds / 1000) % 60,
    milliseconds: Math.floor(milliseconds) % 1000
  }
}

function useCountdown(options?: UseCountdownOptions) {
  const { targetDate, interval = 1000, onEnd } = options || {}

  const [target, setTargetDate] = useState<TargetDate>(targetDate)
  // 剩余时间
  const [timeLeft, setTimeLeft] = useState(() => calcLeft(target))

  const onEndPersistFn = usePersistFn(() => {
    onEnd?.()
  })

  useEffect(() => {
    // 直接 target 为 0
    if (!target) {
      // for stop
      setTimeLeft(0)
      return
    }

    // 立即执行一次，剩余时间
    setTimeLeft(calcLeft(target))

    const timer = setInterval(() => {
      const targetLeft = calcLeft(target)
      setTimeLeft(targetLeft)
      if (targetLeft === 0) {
        clearInterval(timer)
        onEndPersistFn()
      }
    }, interval)

    return () => clearInterval(timer)
  }, [target, interval])

  const formattedRes = useMemo(() => {
    return parseMs(timeLeft)
  }, [timeLeft])

  return [timeLeft, setTargetDate, formattedRes] as const
}

export default useCountdown
