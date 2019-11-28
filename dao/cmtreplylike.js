const db = require('../models');
const CmtReplyLike = db.sequelize.import('../models/cmtreplylike');
const AnsReplyLike = db.sequelize.import('../models/ansreplylike');
const Comment = db.sequelize.import('../models/comment');
const Answer = db.sequelize.import('../models/answer');
class UserModel {
  /**
   * @func clickLikeArticle - 前台点赞逻辑处理
   */
  static async createLike(res) {
    let replylikes = await CmtReplyLike.findAll({
      where: {
        user_id: res.params.user_id
      }
    });
    let replykeItem = replylikes.find(
      item => item.comment_id == res.params.comment_id
    );
    let status = null;
    if (!replykeItem) {
      await CmtReplyLike.create({
        user_id: res.params.user_id,
        comment_id: res.params.comment_id,
        article__id: res.params.article__id,
        reply_like_status: 1
      });
      await Comment.findOne({
        where: {
          id: res.params.comment_id
        }
      }).then(async result => {
        if (result) {
          if (result.id == res.params.comment_id) {
            return result.increment('reply_like_count', { by: 1 });
          }
        }
      });
      return (status = '未点赞过');
    } else {
      return (status = '已点赞过');
    }
  }
  static async createChildLike(res) {
    let replylikes2 = await AnsReplyLike.findAll({
      where: {
        user_id: res.params.user_id
      }
    });
    let replykeItem = replylikes2.find(
      item => item.answer_id == res.params.answer_id
    );
    let status = null;
    if (!replykeItem) {
      await AnsReplyLike.create({
        user_id: res.params.user_id,
        answer_id: res.params.answer_id,
        article__id: res.params.answer_id,
        reply_like_status: 1
      });
      await Answer.findOne({
        where: {
          id: res.params.answer_id
        }
      }).then(async result => {
        if (result) {
          if (result.id == res.params.answer_id) {
            return await result.increment('reply_like_count', { by: 1 });
          }
        }
      });
      return (status = '未点赞过');
    } else {
      return (status = '已点赞过');
    }
  }
  static async getReplyLikeCommentStatusByUserId(user_id) {
    return CmtReplyLike.findAll({
      where: {
        user_id
      }
    });
  }
  static async getReplyLikeAnswerStatusByUserId(user_id) {
    return AnsReplyLike.findAll({
      where: {
        user_id
      }
    });
  }
}
module.exports = UserModel;
