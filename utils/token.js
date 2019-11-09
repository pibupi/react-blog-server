const TOKEN_SECRET = 'my-blog-server';
const TOKEN_EXPIRESIN = '72h';
const jwt = require('jsonwebtoken');

exports.createToken = info => {
  const token = jwt.sign(info, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRESIN });
  console.log('generated token', token);
  return token;
};

const decodeToken = ctx => {
  const authorizationHeader = ctx.headers['Authorization'];
  // console.log(authorizationHeader);
  const token = authorizationHeader.split(' ')[1]; // 取到 token
  console.log('token:', token);
  return jwt.decode(token);
};

exports.decodeToken = decodeToken;
