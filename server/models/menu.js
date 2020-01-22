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

// 模糊查找菜单
exports.getLikeMenuUrl = (val1, val2, val3) => {
  let _sql = `select m.* from blog_menu m where 1=1 `
  let arr = []
  if (val1 !== '') {
    val1 = '%' + val1 + '%'
    _sql += `and m.masterMenu like ?`
    arr.push(val1)
  }
  if (val2 !== '') {
    val2 = '%' + val2 + '%'
    _sql += `and m.type like ?`
    arr.push(val2)
  }
  if (val3 !== '') {
    val3 = '%' + val3 + '%'
    _sql += `and m.url like ?`
    arr.push(val3)
  }
  _sql += `ORDER BY m.sort desc`
  return query(_sql, arr)
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
