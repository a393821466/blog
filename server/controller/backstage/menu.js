const menuService = require('../../service/backstage/menu')
const utils = require('../../utils')
class menuController {
  // 添加菜单
  static async addMenu(ctx) {
    try {
      const query = ctx.request.body
      const das = {
        masterMenu: query.masterMenu,
        type: query.type, // 1模块 2菜单
        subMenu: query.subMenu,
        url: query.url,
        masterId: query.masterId, // 0是模块
        sort: query.sort,
        description: query.description,
        icon: query.icon,
        create_time: Date.now()
      }
      if (das.type == '1') {
        if (
          !das.masterMenu ||
          !das.type ||
          (!das.masterId && das.masterId != '0')
        ) {
          ctx.error(400, '参数不完整')
          return
        }
      } else {
        if (!das.type || (!das.masterId && das.masterId != 0)) {
          ctx.error(400, '参数不完整')
          return
        }
      }
      if (das.type == '1' && das.masterId != '0') {
        ctx.error(500, '类型与所属菜单不匹配')
        return
      }
      if (!das.description) {
        das.description = '这家伙很懒,什么都没写。'
      }
      if (das.type != '1') {
        const getmasterId = await menuService.doFindOneMenu(0, das.masterId)
        if (getmasterId.length == 0) {
          ctx.error(500, '菜单不存在')
          return
        }
        das.masterMenu = getmasterId[0].masterMenu
      }
      const findMasterName = await menuService.doFindOneMenu(2, das.masterMenu)
      if (findMasterName.length > 0 && das.masterId == 0) {
        ctx.error(500, '菜单名称已存在')
        return
      }
      const findSubMenuName = await menuService.doFindOneMenu(3, das.subMenu)
      if (
        das.masterId !== '0' &&
        findSubMenuName.length > 0 &&
        das.type == findSubMenuName[0].type
      ) {
        ctx.error(500, '节点名称已存在')
        return
      }
      if (das.sort > 100 || das.sort < 1) {
        das.sort = 100
      }
      const addMenus = await menuService.doAddMenu([
        das.masterMenu,
        das.subMenu,
        das.type,
        das.url,
        das.masterId,
        das.sort,
        das.description,
        das.icon,
        das.create_time
      ])
      if (!addMenus) {
        ctx.error(500, '系统繁忙,请稍后在试')
      }
      ctx.body = {
        code: 200,
        status: true,
        msg: '添加成功'
      }
    } catch (e) {
      throw new Error(e)
    }
  }
  // 查询菜单
  static async findMenu(ctx) {
    try {
      let findMenus = await menuService.doFindOneMenu(1, '')
      let getMenus = utils.formartMenu(findMenus)
      ctx.body = {
        code: 200,
        status: true,
        value: getMenus
      }
    } catch (e) {
      throw new Error(e)
    }
  }
  // 模糊查询菜单
  static async likeFindMenu(ctx) {
    const query = ctx.query
    try {
      let das = {
        masterMenu: !query.masterMenu ? '' : query.masterMenu,
        type: !query.type || query.type == 'all' ? '' : query.type,
        url: !query.url ? '' : query.url
      }
      const findLikeMenu = await menuService.doFindLikeMenu(
        das.masterMenu,
        das.type,
        das.url
      )
      if (!findLikeMenu) {
        ctx.error(500, '服务器繁忙,请稍后再试')
      }
      ctx.body = {
        code: 200,
        status: true,
        value: findLikeMenu
      }
    } catch (e) {
      throw new Error(e)
    }
  }
  // 修改菜单
  static async changeMenu(ctx) {
    try {
      let {
        id,
        masterMenu,
        subMenu,
        url,
        sort,
        description,
        icon
      } = ctx.request.body
      if (!id) {
        ctx.error(400, '参数不完整')
      }
      let findMenu = await menuService.doFindOneMenu(0, id)
      if (findMenu.length === 0) {
        ctx.error(500, '找不到该权限id')
      }
      if (masterMenu) {
        let findMenusName = await menuService.doFindOneMenu(2, masterMenu)
        if (findMenusName.length >= 1 && findMenusName[0].masterId === 0) {
          ctx.error(500, '该模块已存在')
        }
      }
      let das = {
        masterMenu: masterMenu,
        subMenu: subMenu,
        url: url,
        sort: !sort ? 100 : sort,
        description: !description ? '这家伙很懒,什么都没写。' : description,
        icon: icon
      }
      let ids = parseInt(id)
      let editMenu = await menuService.doUpdateMenu(ids, [
        das.masterMenu,
        das.subMenu,
        das.url,
        das.sort,
        das.description,
        das.icon
      ])
      if (!editMenu) {
        ctx.error(500, '更改失败')
      }
      ctx.body = {
        code: 200,
        status: true,
        msg: '更改成功'
      }
    } catch (e) {
      throw new Error(e)
    }
  }
  // 删除菜单
  static async deletemenu(ctx) {
    try {
      const ids = ctx.query.id
      if (!ids) {
        ctx.error(400, '参数id不正确')
      }
      const findAMenu = await menuService.doFindOneMenu(4, ids)
      if (findAMenu.length > 0) {
        ctx.error(500, '操作失败,该模块存在子级菜单')
      }
      const delMenu = await menuService.doDeleteMenu(ids)
      if (!delMenu) {
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
}

module.exports = menuController
