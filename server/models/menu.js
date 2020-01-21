const query = require('./connect').do

// 添加菜单
exports.addMenu = value => {
  let _sql = `insert into blog_menu(masterMenu,subMenu,type,url,masterId,sort,description,icon,create_time) values(?,?,?,?,?,?,?,?,?)`
  return query(_sql, value)
}

// 更新菜单
exports.updateMenu = value => {
  let _sql = `update blog_menu set masterMenu=?, subMenu=?,url=?,sort=?,description=?,icon=? where id=?`
  return query(_sql, value)
}

// 查找权限
exports.getMenu = (n, value) => {
  let _sql = ''
  if (n === 0) {
    _sql = `select * from blog_menu where id=?`
  } else if (n === 1) {
    _sql = `select * from blog_menu`
  } else if (n === 2) {
    _sql = `select * from blog_menu where masterMenu=?`
  } else if (n === 3) {
    _sql = `select * from blog_menu where subMenu=?`
  } else {
    _sql = `select * from blog_menu where masterId=?`
  }
  return query(_sql, value)
}

// 查找菜单url
exports.getMenuUrl = value => {
  let _sql = `select * from blog_menu where url=?`
  return query(_sql, value)
}

// 删除菜单
exports.delMenu = value => {
  let _sql = `delete from blog_menu where id=?`
  return query(_sql, value)
}
