const api = '/admin'
export default {
  common: {
    login: `/api/login`, // 登录
    logout: `/api/logout`, // 登出
    verify: `/api/captcha` // 验证码
  },
  user: {
    userInfo: `${api}/userInfo` // 获取userInfo
  },
  // 菜单增删改查
  menu: {
    add: `${api}/addMenu`,
    get: `${api}/getMenu`,
    update: `${api}/updateMenu`,
    del: `${api}/delMenu`,
    like: `${api}/likeMenu`,
    isMenu: `${api}/getIsMenu`
  },
  // 文章的增删改查
  article: {
    add: `${api}/addArticle`,
    get: `${api}/getArticle`,
    update: `${api}/updateArticle`,
    del: `${api}/delArticle`,
    singleArticle: `${api}/getSingleArticle`
  },
  // 上传文件
  upload: {
    thumbnail: `${api}/ueditor/thumbnail`, // 上传文章缩略图
    content: `${api}/ueditor/content` // 上传文章内容图
  },
  // 评论
  comment: {
    getComment: `${api}/getComment`, // 获取全部 (后端)
    updateComment: `${api}/updateComment`, //更新文章状态 (后端)
    delComment: `${api}/delComment`, // 删除文章 (后端)
    backstageReply: `${api}/backstageReply`, // 回复评论 (后端)
    sendComment: `/v1/sendComment`, // 评论 (前端)
    findComment: `/v1/getComment`, // 查询评论 （前端）
    getQQInfo: `/v1/getInfoQQ` //查询QQ信息
  }
}
