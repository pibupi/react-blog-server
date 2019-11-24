const likeModel = require('../dao/like');
const articleModel = require('../dao/article');
class likeController {
  /**
   * @func clickLikeArticle - 前台点赞文章
   */
  static async clickLikeArticle(ctx) {
    try {
      const res = ctx.request.body;
      let status = await likeModel.clickLikeArticle(res);
      if (status === '未点赞过') {
        //  如果为点赞过，则需要更新点赞信息，同时要将该篇文章的点赞数增1
        await articleModel.updateArticleList(res);
        ctx.body = {
          code: 0,
          msg: '文章点赞成功'
        };
      } else if (status === '已点赞过') {
        ctx.body = {
          code: 1,
          msg: '已点赞过'
        };
      }
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = likeController;
