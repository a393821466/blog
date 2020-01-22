const Router = require('koa-router')
// const multer = require('koa-multer')
const user = require('../controller/backstage/user')
const menu = require('../controller/backstage/menu')
const system = require('../controller/backstage/system')
const article = require('../controller/backstage/article')
const checkToken = require('../middleware/checkToken')
// const utils = require('../utils/')

// const isDev = process.env.NODE_ENV === 'development'
// let config
// if (isDev) {
//   config = require('../config/dev.config')
// } else {
//   config = require('../config/pro.config')
// }
// let upload = multer({ storage: utils.uploadImg(config.uploadDir) })
const backStageRouter = new Router({
  prefix: '/admin'
})
// 获取用户信息
backStageRouter.get('/userInfo', checkToken, user.getUserInfo)
// 添加菜单
backStageRouter.post('/addMenu', checkToken, menu.addMenu)
// 查询菜单
backStageRouter.get('/getMenu', checkToken, menu.findMenu)
// 模糊查询菜单
backStageRouter.get('/likeMenu', checkToken, menu.likeFindMenu)
// 修改菜单
backStageRouter.put('/updateMenu', checkToken, menu.changeMenu)
// 删除菜单
backStageRouter.delete('/delMenu', checkToken, menu.deletemenu)
// 系统设置
backStageRouter.post('/uploadImg', checkToken, system.uploadLogo)
// 系统信息添加
backStageRouter.post('/addSystem', checkToken, system.addSystem)
// 获取系统信息
backStageRouter.get('/getSystem', checkToken, system.getSystem)
// 添加文章
backStageRouter.post('/addArticle', article.addArticle)
// 查询文章
backStageRouter.get('/getArticle', article.getArticleList)
// 查询单篇文章
backStageRouter.get('/getSingleArticle', article.getSingleArticle)
// 修改文章
backStageRouter.put('/updateArticle', article.updateArticle)
// 删除文章
backStageRouter.delete('/delArticle', article.delArticle)
// 文章缩略图上传
backStageRouter.post('/ueditor/thumbnail', article.uploadMiniImg)
// 文章ueditor图片上传
backStageRouter.post('/ueditor/content', article.uplodContent)

module.exports = backStageRouter
