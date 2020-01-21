const svgCaptcha = require('svg-captcha')
const userModel = require('../../models/user')
const utils = require('../../utils')
const fs = require('fs')
const pump = require('mz-modules/pump')
const FileType = require('file-type')
const sendToWormhole = require('stream-wormhole')
class commonService {
  // 生产验证码
  static async getCaptcha(ctx) {
    let captcha = svgCaptcha.create({
      width: 120,
      height: 48,
      size: 4, // 验证码长度
      ignoreChars: '012iIlLoOzZ', // 验证码字符中排除
      noise: 4, // 干扰线条的数量
      color: false // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
    })
    console.log(captcha.text)
    ctx.session.code = captcha.text
    return captcha.data
  }
  // 登录
  static async login(username) {
    let userLogin = await userModel.findUser('1', username)
    return userLogin
  }
  // 公共上传图片
  static async uploadDirImg(ctx, filePath, imgSize = 500) {
    let file
    if (!ctx.request.files.file) {
      file = ctx.request.files.fileName
    } else {
      file = ctx.request.files.file
    }
    const fileSize = file.size / 1024
    let whiteType = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif']
    let formartType = await FileType.fromFile(file.path)
    if (
      !formartType ||
      !whiteType.includes(formartType.mime) ||
      !whiteType.includes(file.type)
    ) {
      return {
        data: 'type',
        fields: null
      }
    }

    if (parseInt(fileSize) > imgSize) {
      return {
        data: 'size',
        fields: null
      }
    }
    const fileReader = fs.createReadStream(file.path)
    const getUploadFile = await utils.uploadFile(file.path, filePath)
    const writeStream = fs.createWriteStream(getUploadFile.uploadDir)
    try {
      //异步把文件流 写入
      // await awaitWriteStream(stream.pipe(writeStream));
      await pump(fileReader, writeStream)
    } catch (err) {
      //如果出现错误，关闭管道
      await sendToWormhole(fileReader)
      throw new Error(err)
    }
    return {
      data: getUploadFile.saveDir,
      fields: fileReader.fields
    }
  }
}

module.exports = commonService
