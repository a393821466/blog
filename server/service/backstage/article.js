const articleModel = require('../../models/article')

class articleService {
  // 添加文章
  static async doAddArticle(value) {
    const addArticle = await articleModel.addArticle(value)
    return addArticle
  }
  // 修改菜单
  static async doUpdateArticle(id, value) {
    const arr = value.concat(id)
    const updateArticle = await articleModel.updateArticle(arr)
    return updateArticle
  }
  // 根据条件文章
  static async doFindOneArticle(val1, val2, val3, val4, val5, page, size) {
    const findArticle = await articleModel.getArticle(
      val1,
      val2,
      val3,
      val4,
      val5,
      page,
      size
    )
    let das
    let counts = 0
    if (!val1 && !val2 && !val3 && !val4 && !val5) {
      let pageCount = await articleModel.articleCount()
      counts = pageCount[0].count
    } else {
      counts = findArticle.length
    }
    if (!findArticle) {
      das = ''
    } else {
      das = {
        data: findArticle,
        page: page,
        pageSize: size,
        totalPage: Math.ceil(counts / size),
        totelSize: counts
      }
    }
    return das
  }
  // 查找单个文章
  static async singleArticle(id) {
    const oneArticle = await articleModel.singleArticle(id)
    return oneArticle
  }
  // 删除菜单
  static async doDeleteArticle(id) {
    const delArticle = await articleModel.delArticle(id)
    return delArticle
  }
}

module.exports = articleService
