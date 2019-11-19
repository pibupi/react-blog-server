const jwt = require('jsonwebtoken');
const TOKEN_SECRET = 'my-blog-server'; // 这个可以设置到配置项当中
/**
 * @description -验证token 以及token过期的处理，后续需要添加refresh_token来实现无感知刷新
 * @func verifyToken -验证token
 * @param {String} displayName -昵称
 */
const verifyToken = (ctx, next) => {
  if (ctx.header && ctx.header.authorization) {
    const parts = ctx.header.authorization.split(' ');
    if (parts.length === 2) {
      //取出token
      const scheme = parts[0];
      const token = parts[1];
      if (/^Bearer$/i.test(scheme)) {
        try {
          //jwt.verify方法验证token是否有效
          jwt.verify(token, TOKEN_SECRET, {
            complete: true
          });
        } catch (error) {
          const { username, id } = ctx.request.body;
          //token过期 生成新的token
          const newToken = createToken({ username, id });
          //将新token放入Authorization中返回给前端
          ctx.res.setHeader('Authorization', newToken);
        }
      }
    }
  }
  return next().catch(err => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        msg: 'token过期或未授权，重新登陆'
      };
    } else {
      throw err;
    }
  });
};
module.exports = verifyToken;
