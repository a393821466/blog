const config = {
  db: {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'blog_db'
  },
  checkList: ['name', 'email', 'admin', 'administrator'],
  redisIo: {
    host: '127.0.0.1',
    port: 6379
  },
  EXPIRE: 4 * 60 * 60,
  serect: 'IAMBLUEMAPLE',
  uploadDir: './static/public/uploads',
  host: 'http://localhost:3000/'
}

module.exports = config
