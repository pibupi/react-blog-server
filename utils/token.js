const TOKEN_SECRET = 'my-blog-server';
const TOKEN_EXPIRESIN = '600h';
const jwt = require('jsonwebtoken');
/**
 * @func createToken - 创建token
 * @param {Object} info - 用户信息包含姓名、id
 */
exports.createToken = info => {
  const token = jwt.sign(info, TOKEN_SECRET, {
    expiresIn: TOKEN_EXPIRESIN
  });
  return token;
};
/**
 * @func decodeToken - 解析token
 */
const decodeToken = ctx => {
  const authorizationHeader = ctx.headers['Authorization'];
  const token = authorizationHeader.split(' ')[1]; // 取到 token
  return jwt.decode(token);
};

exports.decodeToken = decodeToken;
