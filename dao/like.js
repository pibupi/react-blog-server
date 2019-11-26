const db = require('../models');
const Like = db.sequelize.import('../models/like');
class UserModel {
  /**
   * @func clickLikeArticle - 前台点赞逻辑处理
   */
  static async clickLikeArticle({ user_id, article_id }) {
    // 根据用户id找到所有该用户点赞过的文章
    let like = await Like.findAll({
      where: {
        user_id
      }
    });
    let status = '';
    // 如果没有数据，说明该文章没有被该用户点赞过，直接创建新一条数据到数据库即可
    if (like.length <= 0) {
      await Like.create({
        user_id,
        article_id,
        like_status: 1
      });
      return (status = '未点赞过');
    } else {
      // 这里表示like有值，有值还需要做进一步的判断:
      // like为该用户所有点赞过的文章列表，因为用户可能会为多篇文章进行点赞，
      // 再对其他文章进行点赞时，需要根据新文章的id在该用户所有点赞过的文章进行筛选，
      // 看看该文章在点赞过的文章中存不存在，如果存在即为点赞过，
      // 不存在则没有点赞过
      let one = like.find(item => item.dataValues.article_id == article_id);
      if (!!one) {
        return (status = '已点赞过');
      } else {
        await Like.create({
          user_id,
          article_id,
          like_status: 1
        });
        return (status = '未点赞过');
      }
    }
  }
}
module.exports = UserModel;
