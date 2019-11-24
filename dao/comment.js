const db = require('../models');
const Comment = db.sequelize.import('../models/comment');
class CommentModel {
  /**
   * @func createComment -前台创建用户
   * @param {String} displayName -昵称
   */
  static async createComment(content, article_id, displayName) {
    return await Comment.create({
      article_id,
      displayName,
      content
    });
  }
  /**
   * @func getComment -前台获取某篇文章评论
   * @param {String} displayName -昵称
   */
  static async getComment(article_id) {
    return await Comment.findAll({
      where: {
        article_id
      },
      order: [['id', 'DESC']]
    });
  }
}
module.exports = CommentModel;
