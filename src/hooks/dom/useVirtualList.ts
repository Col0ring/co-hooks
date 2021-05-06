import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react'
import useSize from './useSize'

interface UseVirtualListOptions<T> {
  itemHeight: number | ((item: T, index: number) => number)
  // 视区上、下额外展示的 dom 节点数量
  overscan?: number
  scrollBehavior?: ScrollBehavior
}

interface VirtualContainerProps {
  ref: (element: HTMLElement | null) => void
  onScroll: (e: React.UIEvent) => void
  style: React.CSSProperties
}

interface VirtualWrapperProps {
  style: React.CSSProperties
}

// TODO:页面动画
function useVirtualList<T = any>(list: T[], options: UseVirtualListOptions<T>) {
  // 包装容器
  const containerRef = useRef<HTMLElement | null>(null)
  const size = useSize(containerRef)

  const [state, setState] = useState({ start: 0, end: 10 })

  const { itemHeight, scrollBehavior, overscan = 5 } = options

  // 可以看到的元素数量
  const getViewCapacity = useCallback(
    (containerHeight: number) => {
      // 如果是 number 直接四舍五入
      if (typeof itemHeight === 'number') {
        return Math.ceil(containerHeight / itemHeight)
      }
      // 当前开始索引
      const { start = 0 } = state
      // 总高度
      let sum = 0
      let capacity = 0
      for (let i = start; i < list.length; i++) {
        const height = itemHeight(list[i], i)
        sum += height
        // 如果超出了容器高度。记录索引
        if (sum >= containerHeight) {
          capacity = i
          break
        }
      }
      // 返回中间的元素数量
      return capacity - start
    },
    [itemHeight, state, list]
  )
  // 移动的元素数量
  const getOffset = useCallback(
    (scrollTop: number) => {
      if (typeof itemHeight === 'number') {
        return Math.floor(scrollTop / itemHeight) + 1
      }
      let sum = 0
      let offset = 0
      for (let i = 0; i < list.length; i++) {
        const height = itemHeight(list[i], i)
        sum += height
        if (sum >= scrollTop) {
          offset = i
          break
        }
      }
      return offset + 1
    },
    [itemHeight, list]
  )

  // 计算显示数量的区间
  const calculateRange = useCallback(() => {
    const element = containerRef.current
    if (element) {
      // 移动数量
      const offset = getOffset(element.scrollTop)
      // 可视区数量
      const viewCapacity = getViewCapacity(element.clientHeight)

      // 页面显示的开始
      const from = offset - overscan
      // 页面显示的结束
      const to = offset + viewCapacity + overscan
      const start = from < 0 ? 0 : from
      const end = to > list.length ? list.length : to
      setState((prevState) => {
        if (start === prevState.start && end === prevState.end) {
          return prevState
        }

        return {
          start,
          end
        }
      })
    }
  }, [containerRef, getOffset, getViewCapacity, list])

  // 总高度
  const totalHeight = useMemo(() => {
    if (typeof itemHeight === 'number') {
      return list.length * itemHeight
    }
    return list.reduce((sum, item, index) => sum + itemHeight(item, index), 0)
  }, [list, itemHeight])

  // index 索引距离顶部距离
  const getDistanceTop = useCallback(
    (index: number) => {
      if (typeof itemHeight === 'number') {
        const height = index * itemHeight
        return height
      }
      const height = list
        .slice(0, index)
        .reduce((sum, item, i) => sum + itemHeight(item, i), 0)

      return height
    },
    [list]
  )

  // 滚动到指定 index
  const scrollTo = useCallback(
    (index: number) => {
      if (containerRef.current) {
        // 或触发 onScroll 方法
        containerRef.current.scrollTo({
          top: getDistanceTop(index),
          behavior: scrollBehavior
        })
      }
    },
    [getDistanceTop, calculateRange, scrollBehavior]
  )

  // 当前开始的元素距离顶部距离，用于虚拟列表的跳过
  const offsetTop = useMemo(() => getDistanceTop(state.start), [
    state.start,
    getDistanceTop
  ])

  // 改变宽高重新计算
  useEffect(() => {
    calculateRange()
  }, [size.width, size.height])

  return {
    list: list.slice(state.start, state.end).map((ele, index) => ({
      data: ele,
      index: index + state.start
    })),
    scrollTo,
    containerProps: {
      ref: (ele) => {
        containerRef.current = ele
      },
      onScroll: (e) => {
        e.preventDefault()
        calculateRange()
      },
      style: {
        overflowY: 'auto' as const
      }
    } as VirtualContainerProps,
    wrapperProps: {
      style: {
        width: '100%',
        height: totalHeight - offsetTop,
        marginTop: offsetTop
      }
    } as VirtualWrapperProps
  } as const
}
export type {
  UseVirtualListOptions,
  VirtualContainerProps,
  VirtualWrapperProps
}
export default useVirtualList
