const query = require('./connect').do
// 建立用户
exports.addPower = value => {
  let _sql = `insert into blog_user(username,password,nicename,avator,alipayAccount,tag,about,qq,wechat,github,other,create_time) values(?,?,?,?,?,?,?,?,?,?,?,?)`
  return query(_sql, value)
}
// 查找用户
exports.findUser = (type, value) => {
  let _sql
  if (type == '0') {
    _sql = `select * from blog_user where id=?`
  } else {
    _sql = `select * from blog_user where username=?`
  }
  return query(_sql, value)
}
