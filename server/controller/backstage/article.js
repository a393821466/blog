const commonService = require('../../service/common')
const menuService = require('../../service/backstage/menu')
const articleService = require('../../service/backstage/article')
const utils = require('../../utils')
const isDev = process.env.NODE_ENV === 'development'
let config
if (isDev) {
  config = require('../../config/dev.config')
} else {
  config = require('../../config/pro.config')
}
class articleController {
  // 添加文章
  static async addArticle(ctx) {
    try {
      const query = ctx.request.body
      const data = {
        title: query.title,
        menuId: query.menus,
        autor: 'Maple',
        summary: query.summary,
        status: !query.status ? '' : Number(query.status),
        hot: !query.hot ? '' : Number(query.hot),
        showHome: !query.banner ? '' : Number(query.banner),
        image: query.imageUrl,
        viewerNum: query.viewerNum,
        content: query.content,
        create_time: Date.now()
      }
      let list = []
      if (!data.title || !data.status || !data.hot || !data.showHome) {
        ctx.error(400, '参数不正确')
        return
      }
      if (data.status != 1 && data.status != 2) {
        ctx.error(400, '参数不正确')
        return
      }
      let findMenus = await menuService.doFindOneMenu(1, '')
      if (data.menuId != 0) {
        let getMenus = utils.formartMenu(findMenus)
        filterMenu(getMenus)
        if (list.length <= 0) {
          ctx.error(400, '所属菜单不正确')
          return
        }
      }
      const add = await articleService.doAddArticle([
        data.title,
        data.menuId,
        data.autor,
        data.summary,
        data.status,
        data.hot,
        data.showHome,
        data.image,
        data.viewerNum,
        data.content,
        data.create_time
      ])
      if (!add) {
        ctx.error(500, '系统繁忙,请稍后在试')
      }
      ctx.body = {
        code: 200,
        status: true,
        msg: '添加成功'
      }
      // eslint-disable-next-line no-inner-declarations
      function filterMenu(menu) {
        menu.filter(item => {
          if (item.id == data.menuId) {
            list.push(item)
          }
          if (item.children && item.children.length) {
            filterMenu(item.children)
          }
          return true
        })
      }
    } catch (e) {
      throw new Error(e)
    }
  }
  // 获取单个文章
  static async getSingleArticle(ctx) {
    try {
      const ids = ctx.query.id
      if (!ids) {
        ctx.error(400, '参数id不正确')
      }
      const findSingleArticle = await articleService.singleArticle(ids)
      if (!findSingleArticle) {
        ctx.error(500, '服务器繁忙')
      }
      ctx.body = {
        code: 200,
        status: true,
        value: findSingleArticle
      }
    } catch (e) {
      throw new Error(e)
    }
  }
  // 获取文章
  static async getArticleList(ctx) {
    try {
      const query = ctx.query
      const das = {
        title: !query.title ? '' : query.title,
        hot: !query.hot || query.hot == 'all' ? '' : query.hot,
        menuId: !query.menus || query.menus == 'all' ? '' : query.menus,
        status: !query.status || query.status == 'all' ? '' : query.status,
        showHome: !query.banner || query.banner == 'all' ? '' : query.banner,
        page: !query.page ? 1 : query.page * 1,
        size: !query.pageSize ? 10 : query.pageSize * 1
      }
      let findArticle = await articleService.doFindOneArticle(
        das.title,
        das.hot,
        das.menuId,
        das.status,
        das.showHome,
        das.page,
        das.size
      )
      if (!findArticle) {
        ctx.error(500, '服务器繁忙,请稍后再试')
      }
      ctx.body = {
        code: 200,
        status: true,
        value: findArticle
      }
    } catch (e) {
      throw new Error(e)
    }
  }
  // 更新文章
  static async updateArticle(ctx) {
    try {
      const query = ctx.request.body
      const id = query.id
      const data = {
        title: query.title,
        menuId: query.menus,
        summary: query.summary,
        status: !query.status ? '' : query.status * 1,
        hot: !query.hot ? '' : query.hot * 1,
        showHome: !query.banner ? '' : query.banner * 1,
        image: query.imageUrl,
        content: query.content
      }
      let list = []
      if (!id) {
        ctx.error(400, '参数不完整')
      }
      let findArticle = await articleService.singleArticle(id)
      if (findArticle.length === 0) {
        ctx.error(500, '找不到该文章id')
      }
      let findMenus = await menuService.doFindOneMenu(1, '')
      if (data.menuId != 0) {
        let getMenus = utils.formartMenu(findMenus)
        filterMenu(getMenus)
        if (list.length <= 0) {
          ctx.error(400, '所属菜单不正确')
          return
        }
      }
      const editArticle = await articleService.doUpdateArticle(id, [
        data.title,
        data.menuId,
        data.summary,
        data.status,
        data.hot,
        data.showHome,
        data.image,
        data.content
      ])
      if (!editArticle) {
        ctx.error(500, '更改失败')
      }
      ctx.body = {
        code: 200,
        status: true,
        msg: '更改成功'
      }
      // eslint-disable-next-line no-inner-declarations
      function filterMenu(menu) {
        menu.filter(item => {
          if (item.id == data.menuId) {
            list.push(item)
          }
          if (item.children && item.children.length) {
            filterMenu(item.children)
          }
          return true
        })
      }
    } catch (e) {
      throw new Error(e)
    }
  }
  // 删除文章
  static async delArticle(ctx) {
    try {
      const ids = ctx.query.id
      if (!ids) {
        ctx.error(400, '参数id不正确')
      }
      const delAricle = await articleService.doDeleteArticle(ids)
      if (!delAricle) {
        ctx.error(500, '服务器繁忙')
      }
      ctx.body = {
        code: 200,
        status: true,
        msg: '删除成功'
      }
    } catch (e) {
      throw new Error(e)
    }
  }
  // 上传缩略图
  static async uploadMiniImg(ctx) {
    try {
      const { data, fields } = await commonService.uploadDirImg(ctx, 'summary')
      if (data == 'type' && fields == null) {
        ctx.error(500, '只支持JPG/JPEG/PNG格式')
        return
      }
      if (data == 'size' && fields == null) {
        ctx.error(500, '上传的图片要求小于500k')
        return
      }
      ctx.body = {
        code: 200,
        status: true,
        value: config.host + data
      }
    } catch (e) {
      throw new Error(e)
    }
  }
  // 上传内容图
  static async uplodContent(ctx) {
    try {
      const { data, fields } = await commonService.uploadDirImg(ctx, 'content')
      if (data == 'type' && fields == null) {
        ctx.error(500, '只支持JPG/JPEG/PNG格式')
        return
      }
      if (data == 'size' && fields == null) {
        ctx.error(500, '上传的图片要求小于500k')
        return
      }
      ctx.body = {
        code: 200,
        status: true,
        value: config.host + data
      }
    } catch (e) {
      throw new Error(e)
    }
  }
}

module.exports = articleController
