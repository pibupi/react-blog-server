const koaJwt = require('koa-jwt');
const TOKEN_SECRET = 'my-blog-server';
/**
 * @func koaJwt -处理不需要token鉴权的路由
 */
const tokenUnAllowPath = koaJwt({
  secret: TOKEN_SECRET
}).unless({
  path: [
    /^\/api\/v1\/admin\/user\/login/,
    /^\/api\/v1\/admin\/user\/register/,
    /^\/upload/,
    /^\/api\/v1\/web/
  ]
});
module.exports = tokenUnAllowPath;
