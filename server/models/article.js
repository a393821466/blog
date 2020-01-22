const query = require('./connect').do
// 添加文章
exports.addArticle = value => {
  let _sql = `insert into blog_article(title,menuId,autor,summary,status,hot,showHome,image,viewerNum,content,markContent,create_time) values(?,?,?,?,?,?,?,?,?,?,?,?)`
  return query(_sql, value)
}
// 查找文章
exports.getArticle = (val1, val2, val3, val4, val5, page, size) => {
  let _sql = `select b.* from blog_article b where 1=1 `
  let arr = []
  if (val1 !== '') {
    val1 = '%' + val1 + '%'
    _sql += `and b.title like ?`
    arr.push(val1)
  }
  if (val2 !== '') {
    val2 = '%' + val2 + '%'
    _sql += `and b.hot like ?`
    arr.push(val2)
  }
  if (val3 !== '') {
    val3 = '%' + val3 + '%'
    _sql += `and b.menuId like ?`
    arr.push(val3)
  }
  if (val4 !== '') {
    val4 = '%' + val4 + '%'
    _sql += `and b.status like ?`
    arr.push(val4)
  }
  if (val5 !== '') {
    val5 = '%' + val5 + '%'
    _sql += `and b.showHome like ?`
    arr.push(val5)
  }
  _sql += `ORDER BY b.create_time desc limit ?,?`
  arr.push((page - 1) * size, size)
  return query(_sql, arr)
}
// 获取文章条数
exports.articleCount = () => {
  let _sql = `select count(*) as count from blog_article`
  return query(_sql)
}
// 获取单篇文章
exports.singleArticle = value => {
  let _sql = `select * from blog_article where id=?`
  return query(_sql, value)
}

// 更新文章
exports.updateArticle = value => {
  let _sql = `update blog_article set title=?, menuId=?,summary=?,status=?,hot=?,showHome=?,image=?,content=?,markContent=? where id=?`
  return query(_sql, value)
}

// 删除文章
exports.delArticle = value => {
  let _sql = `delete from blog_article where id=?`
  return query(_sql, value)
}
