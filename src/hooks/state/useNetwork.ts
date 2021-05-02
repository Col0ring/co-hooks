import { useEffect, useState } from 'react'
import { isNavigator } from '../../utils/tools'

interface NetworkInformation extends EventTarget {
  readonly downlink: number
  readonly downlinkMax: number
  readonly effectiveType: 'slow-2g' | '2g' | '3g' | '4g'
  readonly rtt: number
  readonly saveData: boolean
  readonly type:
    | 'bluetooth'
    | 'cellular'
    | 'ethernet'
    | 'none'
    | 'wifi'
    | 'wimax'
    | 'other'
    | 'unknown'

  onChange: (event: Event) => void
}
interface NetworkState {
  // 在线与不在线最后改变时间
  since?: Date
  // 网络是否为在线
  online?: boolean
  // 上一次是否为在线情况
  previous?: boolean
  // 当前连接下评估的往返时延
  rtt?: NetworkInformation['rtt']
  // 设备使用与所述网络进行通信的连接的类型
  type?: NetworkInformation['type']
  // 有效带宽估算（单位：兆比特/秒）
  downlink?: NetworkInformation['downlink']
  //用户代理是否设置了减少数据使用的选项
  saveData?: NetworkInformation['saveData']
  // 最大下行速度（单位：兆比特/秒）
  downlinkMax?: NetworkInformation['downlinkMax']
  // 网络连接的类型
  effectiveType?: NetworkInformation['effectiveType']
}

const nav:
  | (Navigator &
      Partial<
        Record<
          'connection' | 'mozConnection' | 'webkitConnection',
          NetworkInformation
        >
      >)
  | undefined = isNavigator ? navigator : undefined

const conn: NetworkInformation | undefined =
  nav && (nav.connection || nav.mozConnection || nav.webkitConnection)

function getConnectionState(previousState?: NetworkState): NetworkState {
  const online = nav?.onLine
  const previousOnline = previousState?.online

  return {
    online,
    previous: previousOnline,
    since: online !== previousOnline ? new Date() : previousState?.since,
    downlink: conn?.downlink,
    downlinkMax: conn?.downlinkMax,
    effectiveType: conn?.effectiveType,
    rtt: conn?.rtt,
    saveData: conn?.saveData,
    type: conn?.type
  }
}

function useNetwork(initialState?: NetworkState): NetworkState {
  const [state, setState] = useState(initialState ?? getConnectionState)

  useEffect(() => {
    const onOnline = () => {
      setState((prevState) => ({
        ...prevState,
        previous: prevState.online,
        online: true,
        since: new Date()
      }))
    }

    const onOffline = () => {
      setState((prevState) => ({
        ...prevState,
        previous: prevState.online,
        online: false,
        since: new Date()
      }))
    }

    const onConnectionChange = () => {
      setState((prevState) => ({
        ...prevState,
        ...getConnectionState(prevState)
      }))
    }

    window.addEventListener('online', onOnline)
    window.addEventListener('offline', onOffline)

    conn?.addEventListener('change', onConnectionChange)

    return () => {
      window.removeEventListener('online', onOnline)
      window.removeEventListener('offline', onOffline)
      conn?.removeEventListener('change', onConnectionChange)
    }
  }, [])

  return state
}

export type { NetworkState, NetworkInformation }
export default useNetwork
