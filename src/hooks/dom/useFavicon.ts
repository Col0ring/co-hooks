import { useEffect } from 'react'

// image/vnd.microsoft.icon MIME类型只有当图像真的是ICO文件时才会起作用
// image/x-icon 会同时也适用于位图与GIF
// 主要是为了兼容扩展名为ico的非ico文件
const ImgTypeMap = {
  SVG: 'image/svg+xml',
  ICO: 'image/x-icon',
  GIF: 'image/gif',
  PNG: 'image/png'
}
type ImgTypes = keyof typeof ImgTypeMap

const useFavicon = (href: string) => {
  useEffect(() => {
    if (!href) {
      return
    }
    const cutUrl = href.split('.')
    const imgSuffix = cutUrl[cutUrl.length - 1].toLocaleUpperCase() as ImgTypes

    const link: HTMLLinkElement =
      document.querySelector("link[rel*='icon']") ||
      document.createElement('link')
    link.type = ImgTypeMap[imgSuffix] || 'image/x-icon'
    // // 大部分浏览器只会识别'icon' 只有IE会识别整个名称'shortcut icon'
    link.rel = 'shortcut icon'
    link.href = href
    document.getElementsByTagName('head')[0].appendChild(link)
  }, [href])
}

export default useFavicon
