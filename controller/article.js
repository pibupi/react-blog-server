const ArticleModel = require('../dao/article');
const CommentModel = require('../dao/comment');
class ArticleController {
  /**
   * @func getArticleList - 获取分页文章
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
   * @func addArticleList - 新增文章
   * @param {String} url - 图片上传的路径
   * @param {Object} content - 文章内容
   */
  static async addArticleList(ctx) {
    try {
      const {
        content,
        title,
        desc,
        url,
        category_name,
        category_id
      } = ctx.request.body;
      await ArticleModel.addArticle({
        content,
        title,
        desc,
        url,
        category_name,
        category_id
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
   */
  static async updateArticle(ctx) {
    try {
      const {
        content,
        title,
        desc,
        url,
        id,
        category_name,
        category_id
      } = ctx.request.body;
      await ArticleModel.updateArticle({
        content,
        title,
        desc,
        id,
        url,
        category_name,
        category_id
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
   * @func getArticleAllList - 前台获取所有文章
   * @description 此接口待完善！！！
   */
  static async getArticleAllList(ctx) {
    const { current, keywords, pageSize } = ctx.query;
    try {
      const articleList = await ArticleModel.findAllArticles(
        current,
        pageSize,
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
   * @func getArticleById - 前台获取文章详情及评论
   */
  static async getArticleById(ctx) {
    const res = ctx.query;
    try {
      const article = await ArticleModel.findArticleById(res);
      const comments = await CommentModel.getComment(res.article_id);
      if (article) {
        ctx.body = {
          code: 0,
          data: {
            article,
            comments
          },
          msg: '获取文章详情成功'
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
   * @func getArticleOfCateogry - 前台根据分类获取文章列
   * @param {String} name - category_name 分了名称外键
   */
  static async getArticleOfCateogry(ctx) {
    try {
      const { id } = ctx.params;
      let articleOfCategory = await ArticleModel.getArticleOfCateogry(id);
      if (articleOfCategory) {
        ctx.body = {
          code: 0,
          msg: '获取文章成功',
          data: articleOfCategory
        };
      } else {
        ctx.body = {
          code: 403,
          msg: '分类name不能为空'
        };
      }
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = ArticleController;
