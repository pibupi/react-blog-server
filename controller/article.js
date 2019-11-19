const ArticleModel = require('../dao/articleList');
class ArticleController {
  /**
   * @func getArticleList - 更新分页文章
   */
  static async getArticleList(ctx) {
    try {
      let { offset, limited, keywords } = ctx.query;
      const articleList = await ArticleModel.findArticleList(
        offset,
        limited,
        keywords
      );
      if (articleList) {
        ctx.body = {
          code: 0,
          data: {
            count: articleList.count,
            articleList: articleList.rows
          },
          msg: '获取文章列表成功'
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
   * @func getArticleAllList - 更新所有文章
   */
  static async getArticleAllList(ctx) {
    try {
      const articleList = await ArticleModel.findAllArticles();
      if (articleList) {
        ctx.body = {
          code: 0,
          data: articleList,
          msg: '获取文章列表成功'
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
   * @func getArticleById - 更新文章详情
   */
  static async getArticleById(ctx) {
    const { id } = ctx.params;
    try {
      const article = await ArticleModel.findArticleById(id);
      if (article) {
        ctx.body = {
          code: 0,
          data: article
        };
      } else {
        ctx.body = {
          code: 1,
          msg: '资源不存在'
        };
      }
    } catch (err) {
      console.log(err);
    }
  }
  /**
   * @func addArticleList - 新增文章
   * @param {String} url - 图片上传的路径
   * @param {Object} content - 文章内容
   */
  static async addArticleList(ctx) {
    try {
      const { content, title, desc, url, categoryId } = ctx.request.body;
      await ArticleModel.addArticle({
        content,
        title,
        desc,
        url,
        categoryId
      });
      ctx.body = {
        code: 0,
        msg: '新增文章成功'
      };
    } catch (err) {
      console.log(err);
    }
  }
  /**
   * @func updateArticle - 更新文章
   * @description 这个接口的上传还没做
   */
  static async updateArticle(ctx) {
    try {
      const { content, title, desc, url, id, categoryId } = ctx.request.body;
      await ArticleModel.updateArticle({
        content,
        title,
        desc,
        id,
        url,
        categoryId
      });
      ctx.body = {
        code: 0,
        msg: '文章更新成功'
      };
    } catch (err) {
      console.log(err);
    }
  }
  /**
   * @func deleteArticle - 删除文章
   */
  static async deleteArticle(ctx) {
    try {
      const { id } = ctx.request.body;
      if (id != -1) {
        await ArticleModel.deleteArticle(id);
        ctx.body = {
          code: 0,
          msg: '文章删除成功'
        };
      } else {
        ctx.body = {
          code: 403,
          msg: '文章id不能为空'
        };
      }
    } catch (err) {
      console.log(err);
    }
  }
  /**
   * @func uploadImg - 图片上传
   */
  static async uploadImg(ctx) {
    ctx.body = {
      url: 'http://localhost:5001/upload/' + ctx.req.file.filename //返回文件名
    };
  }
}
module.exports = ArticleController;
