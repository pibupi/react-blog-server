const db = require('../models');
const Op = db.Sequelize.Op;
const Article = db.sequelize.import('../models/articlelist');
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
    category_id
  }) {
    return await Article.create({
      title,
      content,
      desc,
      url,
      category_name,
      category_id
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
  static async findArticleById(id) {
    return await Article.findOne({
      where: { id }
    });
  }
}
module.exports = ArticleModel;
