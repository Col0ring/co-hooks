import { useMemo } from 'react'
import classnames from 'classnames'
const useClassName: typeof classnames = (...args) => {
  const className = useMemo(() => classnames(...args), args)
  return className
}

export default useClassName
