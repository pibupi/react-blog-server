const db = require('../models');
const Op = db.Sequelize.Op;
const Article = db.sequelize.import('../models/articlelist');
const Like = db.sequelize.import('../models/like');
class ArticleModel {
  /**
   * @func findArticleList - 获取文章分页数据
   */
  static async findArticleList(offset, limited, keywords) {
    return await Article.findAndCountAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: '%' + keywords + '%'
            }
          },
          {
            desc: {
              [Op.like]: '% ' + keywords + '%'
            }
          }
        ]
      },
      offset: (offset - 1) * +limited,
      limit: +limited,
      order: [['id', 'DESC']]
    });
  }
  /**
   * @func findAllArticles - 新增文章
   */
  static async addArticle({
    title,
    content,
    desc,
    url,
    category_name,
    category_id,
    author
  }) {
    return await Article.create({
      title,
      content,
      desc,
      url,
      category_name,
      category_id,
      author
    });
  }
  /**
   * @func updateArticle - 更新文章
   */
  static async updateArticle({
    content,
    title,
    desc,
    id,
    category_name,
    url,
    category_id
  }) {
    return await Article.update(
      {
        content,
        title,
        desc,
        category_name,
        url,
        category_id
      },
      {
        where: { id }
      }
    );
  }
  /**
   * @func deleteArticle - 删除文章
   */
  static async deleteArticle(id) {
    return await Article.destroy({
      where: { id }
    });
  }
  /**
   * @func getArticleOfCateogry - 前台根据分类名称获取文章列表
   * @param category_name 分类名称外键
   */
  static async getArticleOfCateogry(category_id) {
    return await Article.findAll({
      where: {
        category_id
      }
    });
  }
  /**
   * @func findAllArticles - 前台获取所有文章
   */
  static async findAllArticles(current, pageSize, keywords) {
    return await Article.findAndCountAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: '%' + keywords + '%'
            }
          },
          {
            desc: {
              [Op.like]: '% ' + keywords + '%'
            }
          }
        ]
      },
      offset: (current - 1) * +pageSize,
      limit: +pageSize,
      order: [['id', 'DESC']]
    });
  }
  /**
   * @func findArticleById - 前台获取文章详情
   */
  static async findArticleById(res) {
    let { article_id, user_id } = res;
    // 获取该篇文章详情内容
    let article = await Article.findOne({
      where: { id: article_id }
    });
    await Article.findOne({
      where: { id: article_id }
    }).then(res => {
      res.increment('look_time', { by: 1 });
    });
    // 根据用户id获取该用户点赞过的所有文章记录
    let likeArticles = await Like.findAll({
      where: { user_id }
    });
    article_id = parseInt(article_id);
    // 在该用户所有点赞过的文章中过滤是否该篇文章被点赞过
    let one = likeArticles.find(item => item.article_id === article_id);
    // 如果点赞过则把该篇文章的点赞状态返回给前端，前端据此来展示点赞红心
    if (one) {
      let oneArticle = JSON.parse(JSON.stringify(article));
      let articles = {
        ...oneArticle,
        like_status: one.like_status
      };
      return articles;
    } else {
      return article;
    }
  }
  /**
   * @func updateArticleList - 前台点赞文章点赞数增加
   */
  static async updateArticleList(res) {
    let { article_id } = res;
    return await Article.findOne({
      where: {
        id: article_id
      }
    }).then(res => {
      return res.increment('like_count', { by: 1 });
    });
  }
}
module.exports = ArticleModel;
