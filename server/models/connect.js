const mysql = require('mysql')
const isDev = process.env.NODE_ENV === 'development'
let dbConfig
if (isDev) {
  dbConfig = require('../config/dev.config')
} else {
  dbConfig = require('../config/pro.config')
}
// 连接数据库
let pool = mysql.createPool(dbConfig.db)

// 创建地址池
exports.do = function(sql, data) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, data, (err, rows) => {
          if (err) {
            reject(err)
          }
          connection.release()
          resolve(rows)
        })
      }
    })
  })
}

// 关闭连接
exports.quit = function() {
  pool.end(function(err) {
    if (err) console.log(err)
  })
}
