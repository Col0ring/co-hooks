import React, { memo, useRef, useState } from 'react'
import useCountDown from './hooks/state/useCountDown'
import useBeforeUnload from './hooks/side-effect/useBeforeUnload'
import useTextSelection from './hooks/dom/useTextSelection'
import useCopyToClipboard from './hooks/dom/useCopyToClipboard'
import useFavicon from './hooks/dom/useFavicon'
const obj = {
  a: {
    b: 1,
    c: {
      a: 2
    }
  }
}
export const DEFAULT_FAVICON_URL = 'https://ahooks.js.org/simple-logo.svg'

export const GOOGLE_FAVICON_URL = 'https://www.google.com/favicon.ico'

export default () => {
  const [url, setUrl] = useState<string>(DEFAULT_FAVICON_URL)

  return (
    <>
      <p>
        Current Favicon: <span>{url}</span>
      </p>
      <button
        style={{ marginRight: 16 }}
        onClick={() => {
          setUrl(GOOGLE_FAVICON_URL)
        }}
      >
        Change To Google Favicon
      </button>
      <button
        onClick={() => {
          setUrl(DEFAULT_FAVICON_URL)
        }}
      >
        Back To AHooks Favicon
      </button>
    </>
  )
}
