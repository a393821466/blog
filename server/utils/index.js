const path = require('path')
const jwt = require('jsonwebtoken')
const mkdirp = require('mz-modules/mkdirp')
const dayjs = require('dayjs')
const multer = require('koa-multer')
const isDev = process.env.NODE_ENV === 'development'
let config
if (isDev) {
  config = require('../config/dev.config')
} else {
  config = require('../config/pro.config')
}
const utils = {
  uploadImg(url) {
    //文件上传
    //配置
    var storage = multer.diskStorage({
      //文件保存路径
      destination: function(req, file, cb) {
        cb(null, url)
      },
      //修改文件名称
      filename: function(req, file, cb) {
        console.log(file)
        var fileFormat = file.originalname.split('.')
        cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
      }
    })
    return storage
  },
  // 取公钥
  decryptToken(token) {
    return new Promise(resolve => {
      jwt.verify(
        token,
        config.serect,
        {
          algorithms: ['HS256']
        },
        function(err, ret) {
          if (err) {
            resolve(null)
          } else {
            resolve(ret)
          }
        }
      )
    })
  },
  // 处理菜单
  formartMenu(menu) {
    menu.forEach(ele => {
      let parentId = ele.masterId
      if (parentId === 0) {
        console.log('menu')
      } else {
        menu.forEach(d => {
          if (d.id === parentId) {
            let childArray = d.children
            if (!childArray) {
              childArray = []
            }
            childArray.push(ele)
            d.children = childArray
          }
        })
      }
    })
    const f = menu.filter(ele => ele.masterId === 0)
    return f
  },
  // 上传文件保存目录
  async uploadFile(filename, filePath) {
    // 上传目录
    const uploadDir = config.uploadDir
    // 文件夹
    const dirname = dayjs(Date.now()).format('YYYY')
    // 拼接
    let dir = path.join(uploadDir, filePath, dirname)
    await mkdirp(dir)
    // 生成文件名
    let randomNumber = Math.random() * 1000
    const file = `${Date.now()}${parseInt(randomNumber)}`
    let imgDir = path.join(
      dir,
      file + path.extname(filename).toLocaleLowerCase()
    )
    return {
      uploadDir: imgDir.replace(/\\/g, '/'),
      saveDir: imgDir.slice(7).replace(/\\/g, '/')
    }
  }
}
module.exports = utils
