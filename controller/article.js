const ArticleModel = require('../dao/articleList');
class ArticleController {
  static async getArticleList(ctx) {
    try {
      // 分页还未实现
      const articleList = await ArticleModel.findArticleList();
      if (articleList) {
        ctx.body = {
          code: 0,
          data: articleList,
          msg: '获取文章列表成功'
        };
      } else {
        ctx.body = {
          code: 1,
          msg: '获取失败'
        };
      }
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = ArticleController;
