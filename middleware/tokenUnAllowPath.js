const koaJwt = require('koa-jwt');
const TOKEN_SECRET = 'my-blog-server';
// 
/**
 * @func koaJwt -处理不需要token鉴权的路由
 */
const tokenUnAllowPath = koaJwt({
  secret: TOKEN_SECRET
}).unless({
  path: [
    /^\/api\/v1\/user\/login/,
    /^\/api\/v1\/user\/register/,
    // 这个文章详情参数为id=   改如何写这个
    // /^\/api\/v1\/article\/all/,// 此处为前台获取所有文章做处理
    /^\/api\/v1\/article/,// 此处为前台获取文章详情做处理
    /^\/upload/, // 此处为前台获取图片做处理
  ]
});
module.exports = tokenUnAllowPath;
