const query = require('./connect').do
// 评论
exports.sendComment = value => {
  let _sql = `insert into blog_comment(article_id,comment_name,comment_qq,comment_email,comment_text,reply_id,avatar,device,status,create_time) values(?,?,?,?,?,?,?,?,?,?)`
  return query(_sql, value)
}

// 根据评论ID
exports.commentId = value => {
  let _sql = `select * from blog_comment where id=?`
  return query(_sql, value)
}

// 根据文章ID查找评论
exports.findComment = value => {
  console.log(value)
  let _sql = `select * from blog_comment where article_id=?`
  return query(_sql, value)
}

// 根据评论ID和文章ID获取评论
exports.idAndArticleId = value => {
  let _sql = `select * from blog_comment where id=? and article_id=?`
  return query(_sql, value)
}
// 前端查询评论条件
exports.findCommentTwo = (val1, val2, page, size) => {
  let arr = []
  let _sql = `select * from blog_comment c where 1=1 `
  if (val1 !== '') {
    val1 = '%' + val1 + '%'
    _sql += `and c.article_id like ?`
    arr.push(val1)
  }
  if (val2 !== '') {
    val2 = '%' + val2 + '%'
    _sql += `and c.reply_id like ?`
    arr.push(val2)
  }
  _sql += `ORDER BY c.create_time asc limit ?,?`
  arr.push((page - 1) * size, size)
  return query(_sql, arr)
}

// 后端查询评论条件
exports.backstageComment = (val1, val2, page, size) => {
  let arr = []
  let _sql = `select * from blog_comment c where 1=1 `
  if (val1 !== '') {
    val1 = '%' + val1 + '%'
    _sql += `and c.article_id like ?`
    arr.push(val1)
  }
  if (val2 !== '') {
    val2 = '%' + val2 + '%'
    _sql += `and c.status like ?`
    arr.push(val2)
  }
  _sql += `ORDER BY c.create_time asc limit ?,?`
  arr.push((page - 1) * size, size)
  return query(_sql, arr)
}

// 前端获取评论条数
exports.commentCount = (val1, val2) => {
  let arr = []
  let _sql = `select count(*) as count from blog_comment c where 1=1`
  if (val1 !== '') {
    val1 = '%' + val1 + '%'
    _sql += ` and c.article_id like ?`
    arr.push(val1)
  }
  if (val2 !== '') {
    val2 = '%' + val2 + '%'
    _sql += ` and c.reply_id like ? and c.status=1`
    arr.push(val2)
  }
  return query(_sql, arr)
}

// 后端获取评论条数
exports.backstageCommentCount = (val1, val2) => {
  let arr = []
  let _sql = `select count(*) as count from blog_comment c where 1=1`
  if (val1 !== '') {
    val1 = '%' + val1 + '%'
    _sql += ` and c.article_id like ?`
    arr.push(val1)
  }
  if (val2 !== '') {
    val2 = '%' + val2 + '%'
    _sql += ` and c.status like ?`
    arr.push(val2)
  }
  return query(_sql, arr)
}

// 后端更改评论审核状态
exports.updateCommentStatus = value => {
  let _sql = `update blog_comment set status=? where id=?`
  return query(_sql, value)
}

// 后端删除评论
exports.delComment = value => {
  let _sql = `delete from blog_comment where id=?`
  return query(_sql, value)
}
