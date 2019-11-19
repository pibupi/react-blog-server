const CategoryModel = require('../dao/categoryList');
class ArticleController {
  /**
   * @func getCategoryList - 获取分页分类
   */
  static async getCategoryList(ctx) {
    try {
      let { offset, limited, keywords } = ctx.query;
      const categoryList = await CategoryModel.findCategoryList(
        offset,
        limited,
        keywords
      );
      if (categoryList) {
        ctx.body = {
          code: 0,
          data: {
            count: categoryList.count,
            categoryList: categoryList.rows
          },
          msg: '获取分类成功'
        };
      } else {
        ctx.body = {
          code: 1,
          msg: '获取失败'
        };
      }
    } catch (err) {
      console.log(err);
    }
  }
  /**
   * @func getCategoryAll - 获取所有分类
   */
  static async getCategoryAll(ctx) {
    try {
      const categoryList = await CategoryModel.findAllCategoryList();
      if (categoryList) {
        ctx.body = {
          code: 0,
          data: categoryList,
          msg: '获取分类成功'
        };
      } else {
        ctx.body = {
          code: 1,
          msg: '获取失败'
        };
      }
    } catch (err) {
      console.log(err);
    }
  }
  /**
   * @func addCategory - 新增分类
   */
  static async addCategory(ctx) {
    try {
      const { category_name } = ctx.request.body;
      await CategoryModel.addCategory({
        category_name
      });
      ctx.body = {
        code: 0,
        msg: '新增分类成功'
      };
    } catch (err) {
      console.log(err);
    }
  }
  /**
   * @func updateCategory - 更新分类
   */
  static async updateCategory(ctx) {
    const { categoryId, category_name } = ctx.request.body;
    try {
      await CategoryModel.updateCategory(categoryId, category_name);
      ctx.body = {
        code: 0,
        msg: '更新分类成功'
      };
    } catch (err) {
      console.log(err);
    }
  }
  /**
   * @func deleteCategory - 删除分类
   */
  static async deleteCategory(ctx) {
    try {
      const { categoryId } = ctx.request.body;
      if (categoryId != -1) {
        await CategoryModel.deleteCategory(categoryId);
        ctx.body = {
          code: 0,
          msg: '分类删除成功'
        };
      } else {
        ctx.body = {
          code: 403,
          msg: '分类id不能为空'
        };
      }
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = ArticleController;
