const ArticleModel = require('../dao/articleList');
class ArticleController {
  static async getArticleList(ctx) {
    try {
      // 分页还未实现
      const articleList = await ArticleModel.findArticleList();
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
      const { content, title, desc } = ctx.request.body;
      await ArticleModel.createArticle({
        content,
        title,
        desc
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
    try{
      const {id} = ctx.request.body
      console.log(id)
      if(id != -1){
        await ArticleModel.deleteArticle(id) 
        ctx.body = {
          code:0,
          msg:'文章删除成功'
        }
      }else{
        ctx.body = {
          code:403,
          msg:'文章id不能为空'
        }
      }
    }catch(err){
      console.log(err)
    }
  }
  static async uploadImg(ctx) {
    // (ctx) => {
    // hehe 是要上传图片数据的key值,必须和前端保持统一
    // {
    //   'hehe':图片数据
    // }
    console.log('ctx', ctx);
    let { size, mimetype } = ctx.request.body.file;
    let types = ['jpg', 'jpeg', 'png', 'gif']; // 允许上传的数据类型
    let tmpType = mimetype.split('/')[1];
    if (size > 500000) {
      // return res.send({ errO: -1, msg: '尺寸过大' });
      ctx.body = {
        code: 1,
        msg: '尺寸过大'
      };
    } else if (types.indexOf(tmpType) == -1) {
      // return res.send({ err: -1, msg: '媒体类型错误' });
      ctx.body = {
        code: 1,
        msg: '媒体类型错误'
      };
    } else {
      let url = `../../public/upload/${ctx.request.body.file.filename}`;
      // res.send({ code: 0, msg: '上传成功', img: url });
      ctx.body = {
        code: 0,
        msg: '上传成功',
        imgUrl: url
      };
    }
    // });
  }
}
module.exports = ArticleController;
