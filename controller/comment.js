const CommentModel = require('../dao/comment');
class UserController {
  /**
   * @func addComment -前台添加评论
   */
  static async addComment(ctx) {
    try {
      let { content, article_id, displayName } = ctx.request.body;
      await CommentModel.createComment(content, article_id, displayName);
      ctx.body = {
        code: 0,
        msg: '添加评论成功'
      };
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = UserController;
