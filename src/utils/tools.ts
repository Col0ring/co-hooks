import React from 'react'

export const isBrowser = typeof window !== 'undefined'

export const isNavigator = typeof navigator !== 'undefined'

export function isPromiseLike(value: any): value is PromiseLike<any> {
  return (
    ((typeof value === 'object' && value !== null) ||
      typeof value === 'function') &&
    typeof value.then === 'function'
  )
}

export function isPromise(value: any): value is Promise<any> {
  return value instanceof Promise
}

export function isObject(val: any): boolean {
  return typeof val === 'object' && val !== null
}

export function isFunction(fn: any): fn is Function {
  return typeof fn === 'function'
}

export function props2Arr<T extends GlobalObject>(obj: T): T[keyof T][] {
  return Object.keys(obj).map((key) => obj[key])
}

export function isSameDeps(
  oldDeps: React.DependencyList,
  deps: React.DependencyList
): boolean {
  if (oldDeps === deps) {
    return true
  }
  for (const i in oldDeps) {
    if (oldDeps[i] !== deps[i]) {
      return false
    }
  }
  return true
}

export function isShallowEqual(val: any, other: any) {
  if (isObject(val) && isObject(other)) {
    const props1 = Object.getOwnPropertyNames(val)
    const props2 = Object.getOwnPropertyNames(other)
    if (props1.length !== props2.length) {
      return false
    }
    const len = props1.length
    for (let i = 0; i < len; i++) {
      const propName = props1[i]
      if (val[propName] !== other[propName]) {
        return false
      }
    }
    return true
  }
  return val === other
}
