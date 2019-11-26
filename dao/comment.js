const db = require('../models');
const Comment = db.sequelize.import('../models/comment');
const Answer = db.sequelize.import('../models/answer');
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
  static async createAnswerComment(
    parent_id,
    displayName,
    answerContent,
    article_id
  ) {
    return await Answer.create({
      parent_id,
      displayName,
      answerContent,
      article_id
    });
  }
  static async getAnswerComments(article_id) {
    return await Answer.findAll({
      where: {
        article_id
      }
    });
  }
}
module.exports = CommentModel;
