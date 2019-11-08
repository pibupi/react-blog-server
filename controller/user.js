const UserModel = require('../dao/user');
class UserController {
  static async create(ctx) {
    let req = ctx.request.body;
    try {
      await UserModel.createUser(req);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        msg: '创建用户成功'
      };
    } catch (err) {
      console.log(err);
      ctx.response.status = 412;
      ctx.body = {
        code: 412,
        msg: '创建用户失败',
        data: err
      };
    }
  }
}
module.exports = UserController;
