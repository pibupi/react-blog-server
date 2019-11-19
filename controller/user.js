const UserModel = require('../dao/user');
class UserController {
  /**
   * @func register -注册用户
   */
  static async register(ctx) {
    let { username, displayName, password } = ctx.request.body;
    try {
      const user = await UserModel.findUser(username);
      if (user) {
        ctx.response.status = 200;
        ctx.body = {
          code: 1,
          msg: '用户名已被占用'
        };
      } else {
        try {
          const saltPassword = await UserModel.encrypt(password);
          await UserModel.createUser({
            username,
            displayName,
            password: saltPassword
          });
          ctx.response.status = 200;
          ctx.body = {
            code: 0,
            msg: '注册用户成功'
          };
        } catch (err) {
          console.log(err);
        }
      }
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
  /**
   * @func login -用户登录
   */
  static async login(ctx) {
    let { username, password } = ctx.request.body;
    try {
      const user = await UserModel.findUser(username);
      if (!user) {
        ctx.response.status = 200;
        ctx.body = {
          code: 1,
          msg: '用户不存在'
        };
      } else {
        const isMatch = await UserModel.verifyPassword(password, user.password);
        if (!isMatch) {
          ctx.body = {
            code: 1,
            msg: '密码不正确'
          };
        } else {
          const { id } = user;
          const token = await UserModel.createToken({
            username: user.username,
            id: id
          });
          ctx.body = {
            code: 0,
            msg: '登录成功',
            username: user.username,
            displayName: user.displayName,
            token
          };
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = UserController;
