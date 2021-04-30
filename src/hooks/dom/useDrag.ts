import { useCallback } from 'react'

type UseDragReturn<T> = (
  data: T
) => {
  draggable: 'true'
  onDragStart: (e: React.DragEvent) => void
  onDragEnd: (e: React.DragEvent) => void
}

interface UseDragOptions<T> {
  onDragStart?: (data: T, e: React.DragEvent) => void
  onDragEnd?: (data: T, e: React.DragEvent) => void
}

function useDrag<T = any>(options?: UseDragOptions<T>): UseDragReturn<T> {
  const getProps = useCallback(
    (data: T) => {
      return {
        draggable: 'true' as const,
        onDragStart: (e: React.DragEvent) => {
          options?.onDragStart?.(data, e)
          // 额外的属性，可以自行获取
          e.dataTransfer.setData('custom', JSON.stringify(data))
        },
        onDragEnd: (e: React.DragEvent) => {
          options?.onDragEnd?.(data, e)
        }
      }
    },
    [Object.values(options || {})]
  )

  return getProps
}

export type { UseDragReturn, UseDragOptions }
export default useDrag
