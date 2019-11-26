const CmtReplyLikeModel = require('../dao/cmtreplylike');
class ReplylikeController {
  /**
   * @func clickLikeArticle - 前台点赞文章
   */
  static async replylike(ctx) {
    try {
      const res = ctx.request.body;
      let status = await CmtReplyLikeModel.createLike(res);
      if (status === '已点赞过') {
        ctx.body = {
          code: 1,
          msg: '已点赞过'
        };
      } else {
        ctx.body = {
          code: 0,
          msg: '点赞成功'
        };
      }
    } catch (err) {
      console.log(err);
    }
  }
  static async replychildlike(ctx) {
    try {
      const res = ctx.request.body;
      let status = await CmtReplyLikeModel.createChildLike(res);
      if (status === '已点赞过') {
        ctx.body = {
          code: 1,
          msg: '已点赞过'
        };
      } else {
        ctx.body = {
          code: 0,
          msg: '点赞成功'
        };
      }
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = ReplylikeController;
