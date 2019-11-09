const koaJwt = require('koa-jwt');
const TOKEN_SECRET = 'my-blog-server';

const verifyToken = koaJwt({ secret: TOKEN_SECRET }).unless({
  path: [/^\/user\/login/, /^\/user\/register/]
});
module.exports = verifyToken;
