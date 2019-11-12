const TOKEN_SECRET = 'my-blog-server';
const TOKEN_EXPIRESIN = '1h';
const jwt = require('jsonwebtoken');

exports.createToken = info => {
  const token = jwt.sign(info, TOKEN_SECRET, {
    expiresIn: TOKEN_EXPIRESIN
  });
  return token;
};

const decodeToken = ctx => {
  const authorizationHeader = ctx.headers['Authorization'];
  const token = authorizationHeader.split(' ')[1]; // 取到 token
  return jwt.decode(token);
};

exports.decodeToken = decodeToken;
