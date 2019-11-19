const db = require('../models');
const Sequelize = require('sequelize');
const CategoryModel = require('../models/category');
const Op = Sequelize.Op;
const Article = db.sequelize.import('../models/articlelist');
class ArticleModel {
  /**
   * @func findArticleList - 获取文章分页数据
   */
  static async findArticleList(offset, limited, keywords) {
    return await Article.findAndCountAll({
      where: {
        title: {
          [Op.like]: '%' + keywords + '%'
        }
      },
      offset: (offset - 1) * +limited,
      limit: +limited,
      order: [['id', 'DESC']]
      // row: true
    });
  }
  /**
   * @func findAllArticles - 获取所有文章
   */
  static async findAllArticles() {
    return await Article.findAll();
  }
  /**
   * @func findAllArticles - 新增文章
   */
  static async addArticle({ title, content, desc, url, categoryId }) {
    return await Article.create({
      title,
      content,
      desc,
      url,
      categoryId
    });
  }
  /**
   * @func findArticleById - 获取文章详情
   */
  static async findArticleById(id) {
    return await Article.findOne({
      where: { id }
    });
  }
  /**
   * @func updateArticle - 更新文章
   */
  static async updateArticle({ content, title, desc, id, categoryId, url }) {
    return await Article.update(
      {
        content,
        title,
        desc,
        categoryId,
        url
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
}
module.exports = ArticleModel;
