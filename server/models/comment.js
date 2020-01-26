const query = require('./connect').do
// 评论
exports.sendComment = value => {
  let _sql = `insert into blog_comment(article_id,comment_name,comment_qq,comment_email,comment_text,reply_id,avatar,status,create_time) values(?,?,?,?,?,?,?,?,?)`
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

// 查询评论条件
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

// 获取评论条数
exports.commentCount = () => {
  let _sql = `select count(*) as count from blog_comment`
  return query(_sql)
}

// 关联查询
exports.findReply = value => {
  let _sql = `select * from blog_comment c INNER JOIN blog_reply r where c.id=r.comment_id and article_id=?`
  return query(_sql, value)
}
