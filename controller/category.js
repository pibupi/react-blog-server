const CategoryModel = require('../dao/categoryList');
class ArticleController {
  static async createCategory(ctx) {
    try {
      const { category_name } = ctx.request.body;
      await CategoryModel.createCategory({
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
  static async deleteCategory(ctx) {
    try {
      const { categoryId } = ctx.request.body;
      console.log(categoryId);
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
  static async updateCategory(ctx) {
    const { categoryId,category_name } = ctx.request.body;
    console.log(categoryId,category_name)
    try {
      await CategoryModel.updateCategory(categoryId,category_name);
      // if (article) {
        ctx.body = {
          code: 0,
          // data: article
          msg:'更新分类成功'
        };
      // } else {
      //   ctx.body = {
      //     code: 1,
      //     msg: '资源不存在'
      //   };
      // }
    } catch (err) {
      console.log(err);
    }
  }
  static async getCategory(ctx) {
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
  static async getCategoryAll(ctx) {
    try {
      // let { offset, limited, keywords } = ctx.query;
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
}
module.exports = ArticleController;
