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
    like: `${api}/likeMenu`
  },
  // 文章的增删改查
  article: {
    add: `${api}/addArticle`,
    get: `${api}/getArticle`,
    update: `${api}/updateArticle`,
    del: `${api}/delArticle`,
    singleArticle: `${api}/getSingleArticle`
  },
  upload: {
    thumbnail: `${api}/ueditor/thumbnail`, // 上传文章缩略图
    content: `${api}/ueditor/content` // 上传文章内容图
  }
}
