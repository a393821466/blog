// 缓存处理
export function isObject(x) {
  return x != null && x !== undefined && typeof x === 'object'
}

export const setSession = (keyName, val) => {
  let parsedVal
  if (isObject(val)) {
    parsedVal = JSON.stringify(val)
  } else {
    parsedVal = val
  }
  window.sessionStorage.setItem(keyName, parsedVal)
}

export const getSession = keyName => {
  const val = window.sessionStorage.getItem(keyName)
  if (val) {
    return JSON.parse(val)
  }
  return undefined
}

export const getNotSession = keyName => {
  const val = window.sessionStorage.getItem(keyName)
  return val
}

export const setLocal = (keyName, val) => {
  let parsedVal
  if (isObject(val)) {
    parsedVal = JSON.stringify(val)
  } else {
    parsedVal = val
  }
  window.localStorage.setItem(keyName, parsedVal)
}

export const getNoLocal = keyName => {
  const val = window.localStorage.getItem(keyName)
  if (val) {
    return val
  }
  return undefined
}

export const getLocal = keyName => {
  const val = window.localStorage.getItem(keyName)
  if (val) {
    return JSON.parse(val)
  }
  return undefined
}

export const removeLocal = keyName => window.localStorage.removeItem(keyName)
export const removeSession = keyName =>
  window.sessionStorage.removeItem(keyName)
export const clearALLlocal = () => window.localStorage.clear()
export const clearALLsession = () => window.sessionStorage.clear()
