const crypto = require('crypto')
let pwdMD5 = psw => {
  let md5 = crypto.createHash('md5')
  let password = md5.update(psw).digest('base64')
  return password
}
module.exports = pwdMD5
