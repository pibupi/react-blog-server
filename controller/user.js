const axios = require('axios');
const UserModel = require('../dao/user');
class UserController {
  /**
   * @func register -注册用户
   */
  static async register(ctx) {
    let { username, displayName, password, email, phone } = ctx.request.body;
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
          if(username === 'admin'){
            const saltPassword = await UserModel.encrypt(password);
            await UserModel.createUser({
              username,
              displayName,
              email,
              password: saltPassword,
              phone,
              auth:1
            });
            ctx.response.status = 200;
            ctx.body = {
              code: 0,
              msg: '注册用户成功'
            };
          }else{
            const saltPassword = await UserModel.encrypt(password);
            await UserModel.createUser({
              username,
              displayName,
              email,
              password: saltPassword,
              phone,
              auth:2
            });
            ctx.response.status = 200;
            ctx.body = {
              code: 0,
              msg: '注册用户成功'
            };
          }
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
            token,
            auth:user.auth
          };
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  /**
   * @func getUsers -获取所有用户
   */
  static async getUsers(ctx) {
    let { offset, limited, keywords } = ctx.query;
    try {
      const user = await UserModel.findUserList(offset, limited, keywords);
      if (user) {
        ctx.body = {
          code: 0,
          data: user.rows,
          count: user.count,
          msg: '获取用户列表成功'
        };
      }
    } catch (err) {
      console.log(err);
    }
  }
  /**
   * @func deleteUsers -删除用户
   */
  static async deleteUsers(ctx) {
    const { id } = ctx.request.body;
    if (id != -1) {
      await UserModel.deleteUser(id);
      ctx.body = {
        code: 0,
        msg: '用户删除成功'
      };
    } else {
      ctx.body = {
        code: 403,
        msg: '用户id不能为空'
      };
    }
  }
  /**
   * @func updateUsers - 更新用户
   */
  static async updateUsers(ctx) {
    const {
      data: { username, displayName, id }
    } = ctx.request.body;
    try {
      await UserModel.updateUser(username, displayName, id);
      ctx.body = {
        code: 0,
        msg: '更新用户成功'
      };
    } catch (err) {
      console.log(err);
    }
  }
  /**
   * @func oauth - github授权
   */
  static async oauth(ctx) {
    const clientID = 'eb12a53881547ca7c69f';
    const clientSecret = 'eb9ed46c6a4c5eb409e3d5169e5db2d81e632676';
    const { code } = ctx.query;
    const tokenResponse = await axios({
      method: 'post',
      url:
        'https://github.com/login/oauth/access_token?' +
        `client_id=${clientID}&` +
        `client_secret=${clientSecret}&` +
        `code=${code}`,
      headers: {
        accept: 'application/json'
      }
    });
    const accessToken = tokenResponse.data.access_token;
    const result = await axios({
      method: 'get',
      url: `https://api.github.com/user`,
      headers: {
        accept: 'application/json',
        Authorization: `token ${accessToken}`
      }
    });
    const name = result.data.login;
    const user = await UserModel.findUser(name);
    if (user) {
      ctx.body = {
        code: 0,
        msg: '登录成功'
      };
      ctx.response.redirect(`http://localhost:8080/?name=${name}`);
      return;
    }
    let userinfo = {
      username: result.data.login,
      displayName: result.data.login,
      id: result.data.id,
      password: result.data.login
    };
    const saltPassword = await UserModel.encrypt(userinfo.password);
    await UserModel.createUser({
      username: userinfo.username,
      displayName: userinfo.displayName,
      id: userinfo.id,
      password: saltPassword
    });
    ctx.body = {
      code: 0,
      msg: '授权登录成功'
    };
    ctx.response.redirect(`http://localhost:8080/?name=${name}`);
  }
}
module.exports = UserController;
