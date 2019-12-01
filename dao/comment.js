const db = require('../models');
const Comment = db.sequelize.import('../models/comment');
const Answer = db.sequelize.import('../models/answer');
const Article = db.sequelize.import('../models/articlelist');
class CommentModel {
  /**
   * @func createComment -前台创建父级评论
   * @param {String} displayName -昵称
   */
  static async createComment(content, article_id, displayName) {
    await Comment.create({
      article_id,
      displayName,
      content
    });
    await Article.findOne({
      where: {
        id: article_id
      }
    }).then(async res => {
      return await res.increment('comment_count', { by: 1 });
    });
  }
  /**
   * @func getComment -前台获取父级评论
   */
  static async getComment(article_id) {
    return await Comment.findAll({
      where: {
        article_id
      },
      order: [['id', 'DESC']]
    });
  }
  /**
   * @func createAnswerComment -前台创建子级评论
   */
  static async createAnswerComment(
    parent_id,
    displayName,
    answerContent,
    article_id
  ) {
    await Answer.create({
      parent_id,
      displayName,
      answerContent,
      article_id
    });
    await Article.findOne({
      where: {
        id: article_id
      }
    }).then(async res => {
      await res.increment('comment_count', { by: 1 });
    });
  }
  /**
   * @func createAnswerComment -前台获取子级评论
   */
  static async getAnswerComments(article_id) {
    return await Answer.findAll({
      where: {
        article_id
      }
    });
  }
}
module.exports = CommentModel;
