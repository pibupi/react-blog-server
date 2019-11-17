const koaJwt = require('koa-jwt');
const TOKEN_SECRET = 'my-blog-server';
// 处理token需要鉴权的路由
const tokenUnAllowPath = koaJwt({
  secret: TOKEN_SECRET
}).unless({
  path: [
    /^\/api\/v1\/user\/login/,
    /^\/api\/v1\/user\/register/,
    /^\/api\/v1\/article\/alllist/,
    /^\/api\/v1\/article/,
    /^\/upload/,
    /^\/api\/v1\/upload\/title/
  ]
});
module.exports = tokenUnAllowPath;
