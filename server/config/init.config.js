const userModel = require('../models/user')
const crypto = require('../utils/crypto')
const mysql = require('../models/connect')
class init {
  static getInstance() {
    if (!init.instance) {
      /* eslint-disable */
      init.instance = new init()
    }
    return init.instance
  }
  constructor() {
    init.connectInit()
  }
  static async connectInit() {
    try {
      await init.addAdminSuper()
      mysql.quit()
    } catch (e) {
      console.log(e)
      console.log('初始化失败,请检查mysql配置是否正确')
    }
  }
  static async addAdminSuper() {
    let data = {
      username: 'admin',
      password: '1qaz2wsx',
      nicename: '一杯二锅头',
      avator: '暂未开放',
      alipayAccount:'',
      tag:'前端Noob,4年经验,小小胖,研究美食,喜欢开发',
      about:'2015年7月毕业,最开始学了设计,后转的前端,算是半路出家,开发这个系统,一方面是希望有一个对自己学习生活记录的存储空间,另一方面是可以跟广大编程爱好者一起学习.',
      qq:'393821466',
      wechat:'achenger520',
      github:'a393821466',
      other:'https://www.baidu.com',
      create_time: Date.now()
    }
    const findUser = await userModel.findUser('1', data.username)
    if (findUser.length > 0) {
      console.log('管理员已存在')
      return false
    }
    console.log(data.password)
    let pwd = crypto(crypto(data.password) + 'blueMaple')
    let val = [
      data.username,
      pwd,
      data.nicename,
      data.avator,
      data.alipayAccount,
      data.tag,
      data.about,
      data.qq,
      data.wechat,
      data.github,
      data.other,
      data.create_time
    ]
    const addUsers = await userModel.addPower(val)
    if (addUsers) {
      console.log('初始化成功')
    }
  }
}

init.getInstance()
