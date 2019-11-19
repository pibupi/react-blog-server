const db = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Category = db.sequelize.import('../models/Category');
class ArticleModel {
  /**
   * @func findCategoryList - 分页查找分类
   */
  static async findCategoryList(offset, limited, keywords) {
    return await Category.findAndCountAll({
      // 搜索还未实现
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
  /**
   * @func createCategory - 新增分类
   * @param {String} category_name - 分类名称
   */
  static async addCategory({ category_name }) {
    return await Category.create({
      category_name: category_name
    });
  }
  /**
   * @func updateCategory - 更新分类
   * @param {String} categoryId - 分类id
   * @param {String} category_name - 分类名称
   */
  static async updateCategory(categoryId, category_name) {
    return await Category.update(
      {
        category_name
      },
      {
        where: { id: categoryId }
      }
    );
  }
  /**
   * @func deleteCategory - 删除分类
   * @param {String} id - 分类id
   */
  static async deleteCategory(id) {
    return await Category.destroy({
      where: { id }
    });
  }
  /**
   * @func findAllCategoryList - 获取所有分类
   */
  static async findAllCategoryList() {
    return await Category.findAll();
  }
}
module.exports = ArticleModel;
