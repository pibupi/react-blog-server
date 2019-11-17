const db = require('../models');
const Sequelize = require('sequelize');
const CategoryModel = require('../models/category')
const Op = Sequelize.Op;
const Article = db.sequelize.import('../models/articlelist');
class ArticleModel {
  static async findArticleList(offset, limited, keywords) {
    return await Article.findAndCountAll({
      where: {
        title: {
          [Op.like]: '%' + keywords + '%'
        }
      },
      offset: (offset - 1) * +limited,
      limit: +limited,
      order: [['id', 'DESC']],
      row: true
    });
  }
  static async findAllArticles() {
    return await Article.findAll();
  }
  static async createArticle(data) {
    return await Article.create({
      title: data.title,
      content: data.content,
      desc: data.desc,
      url:data.url,
      categoryId:data.categoryId
    });
  }
  static async findArticleById(id) {
    return await Article.findOne({
      where: { id }
    });
  }
  static async updateArticle({ content, title, desc, id }) {
    return await Article.update(
      {
        content,
        title,
        desc
      },
      {
        where: { id }
      }
    );
  }
  static async deleteArticle(id) {
    console.log('id', id);
    return await Article.destroy({
      where: { id }
    });
  }
}
module.exports = ArticleModel;
