const config = {
  db: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'blog_db'
  },
  checkList: ['name', 'email', 'admin', 'administrator'],
  redisIo: {
    host: '127.0.0.1',
    port: 6379
  },
  avatorPath: '/upload',
  EXPIRE: 4 * 60 * 60,
  serect: 'IAMBLUEMAPLE',
  uploadDir: 'app/public/uploads',
  host: 'https://baidu.com/'
}

module.exports = config
