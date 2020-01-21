/**
 * 验证邮箱
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 验证用户名
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const u = /^[a-zA-Z0-9_-]{5,16}$/
  return u.test(str)
}

/**
 * 验证名称
 * @param {string} str
 */
export function isvalidNickname(str) {
  const codeRegexp = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/
  return codeRegexp.test(str)
}

/**
 * 验证中英文名称
 * @param {string} str
 */
export function validateName(str) {
  const reg = /^([\u4E00-\u9FFF]|[a-z]){2,11}$/g
  return reg.test(str)
}
