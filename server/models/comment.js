const query = require('./connect').do
// 评论
exports.sendComment = value => {
  let _sql = `insert into blog_comment(article_id,comment_name,comment_qq,comment_email,comment_text,avatar,status,create_time) values(?,?,?,?,?,?,?,?)`
  return query(_sql, value)
}
// 回复
exports.sendReply = value => {
  let _sql = `insert into blog_reply(comment_id,reply_name,reply_email,reply_qq,reply_text,avatar,status,create_time) values(?,?,?,?,?,?,?,?)`
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

// 关联查询
exports.findReply = value => {
  let _sql = `select * from blog_comment c INNER JOIN blog_reply r where c.id=r.comment_id and article_id=?`
  return query(_sql, value)
}
