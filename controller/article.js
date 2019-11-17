const ArticleModel = require('../dao/articleList');
class ArticleController {
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
  static async addArticleList(ctx) {
    try {
      const { content, title, desc ,url,categoryId} = ctx.request.body;
      // console.log(articlePic[0].size)
      await ArticleModel.createArticle({
        content,
        title,
        desc,
        url,
        categoryId
        // articlePic
      });
      ctx.body = {
        code: 0,
        msg: '新增文章成功'
      };
    } catch (err) {
      console.log(err);
    }
  }
  static async updateArticle(ctx) {
    try {
      const { content, title, desc, id } = ctx.request.body;
      await ArticleModel.updateArticle({
        content,
        title,
        desc,
        id
      });
      ctx.body = {
        code: 0,
        msg: '文章更新成功'
      };
    } catch (err) {
      console.log(err);
    }
  }
  static async deleteArticle(ctx) {
    try {
      const { id } = ctx.request.body;
      console.log(id);
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
  static async uploadImg(ctx) {
    // console.log(ctx.request.body)
    // (ctx) => {
    // hehe 是要上传图片数据的key值,必须和前端保持统一
    // {
    //   'hehe':图片数据
    // }
  //   console.log('ctx', ctx);
  //   let { mimetype } = ctx.file;
  //   // let {mimetype} = ctx;
  //   console.log(mimetype)
  //   let types = ['jpg', 'jpeg', 'png', 'gif']; // 允许上传的数据类型
  //   let tmpType = mimetype.split('/')[1];
  //   if (size > 500000) {
  //     // return res.send({ errO: -1, msg: '尺寸过大' });
  //     ctx.body = {
  //       code: 1,
  //       msg: '尺寸过大'
  //     };
  //   } else 
  //   if (types.indexOf(tmpType) == -1) {
  //     // return res.send({ err: -1, msg: '媒体类型错误' });
  //     ctx.body = {
  //       code: 1,
  //       msg: '媒体类型错误'
  //     };
  //   } else {
  //     let url = `http://localhost:5001/upload/'+ctx.req.file.filename//返回文件名`;
  //     // res.send({ code: 0, msg: '上传成功', img: url });
  //     ctx.body = {
  //       code: 0,
  //       msg: '上传成功',
  //       imgUrl: url
  //     };
  //   }
  //   // });
  // }
  // static async savePic(ctx) {

  }
}
module.exports = ArticleController;
