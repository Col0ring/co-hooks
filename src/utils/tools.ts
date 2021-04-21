import React from 'react'
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

export function props2Arr(obj: GlobalObject) {
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
