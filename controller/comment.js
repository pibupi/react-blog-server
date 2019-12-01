const CommentModel = require('../dao/comment');
class CommentController {
  /**
   * @func addComment -前台添加父级评论
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
  /**
   * @func addAnswerComment -前台添加子级评论
   */
  static async addAnswerComment(ctx) {
    let {
      parent_id,
      displayName,
      answerContent,
      article_id
    } = ctx.request.body;
    try {
      await CommentModel.createAnswerComment(
        parent_id,
        displayName,
        answerContent,
        article_id
      );
      ctx.body = {
        code: 0,
        msg: '添加评论成功'
      };
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = CommentController;
