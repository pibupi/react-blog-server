const ArticleModel = require('../dao/articleList');
class ArticleController {
  static async getArticleList(ctx) {
    try {
      const articleList = await ArticleModel.findArticleList();
      // console.log(articleList);
      ctx.body = {
        code: 0,
        body: articleList,
        msg: '获取文章列表成功'
      };
    } catch (err) {
      console.log(err);
    }
  }
  //   let { username, password } = ctx.request.body;
  //   console.log(username, password);
  //   try {
  //     const user = await UserModel.findUser(username);
  //     if (user) {
  //       ctx.response.status = 200;
  //       ctx.body = {
  //         code: 1,
  //         msg: '用户名已被占用'
  //       };
  //     } else {
  //       try {
  //         const saltPassword = await UserModel.encrypt(password);
  //         await UserModel.createUser({ username, password: saltPassword });
  //         ctx.response.status = 200;
  //         ctx.body = {
  //           code: 0,
  //           msg: '注册用户成功'
  //         };
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     ctx.response.status = 412;
  //     ctx.body = {
  //       code: 412,
  //       msg: '创建用户失败',
  //       data: err
  //     };
  //   }
  // }
}
module.exports = ArticleController;
