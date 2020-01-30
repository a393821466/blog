const query = require('./connect').do

// 添加系统设置
exports.addSystem = value => {
  let _sql = `insert into blog_system(userId,title,summary,logo,logoImg,seo) values(?,?,?,?,?,?)`
  return query(_sql, value)
}

// 更新系统设置
exports.updateSystem = value => {
  let _sql = `update blog_system set title=?, summary=?,logo=?,logoImg=?,seo=? where userId=?`
  return query(_sql, value)
}

// 查询系统设置
exports.getSystem = value => {
  let _sql = `select * from blog_system where userId=?`
  return query(_sql, value)
}
