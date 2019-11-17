const db = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
// const Category = db.sequelize.import('../models/Category');
class ArticleModel {
  static async findCategoryList(offset, limited, keywords) {
    return await Category.findAndCountAll({
      // where: {
      //   title: {
      //     [Op.like]: '%' + keywords + '%'
      //   }
      // },
      offset: (offset - 1) * +limited,
      limit: +limited,
      order: [['id', 'DESC']],
      row: true
    });
  }
  // static async findAllArticles() {
  //   return await Article.findAll();
  // }
  static async createCategory({category_name}) {
    return await Category.create({
      category_name:category_name
    });
  }
  // static async updateCategory(id) {
  //   return await Article.findOne({
  //     where: { id }
  //   });
  // }
  static async updateCategory(categoryId,category_name) {
    return await Category.update(
      {
        category_name
      },
      {
        where: { id:categoryId }
      }
    );
  }
  static async deleteCategory(id) {
    console.log('id', id);
    return await Category.destroy({
      where: { id }
    });
  }
  static async findAllCategoryList() {
    return await Category.findAll();
  }
}
module.exports = ArticleModel;
