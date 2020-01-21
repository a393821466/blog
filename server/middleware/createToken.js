const jwt = require('jsonwebtoken')
const config = require('../config/dev.config')
module.exports = (data, expires = 10800) => {
  // 生成时间戳
  const exp = Math.floor(Date.now() / 1000) + expires
  // 生成token
  const token = jwt.sign({ data, exp }, config.serect, { algorithm: 'HS256' })
  return token
}
