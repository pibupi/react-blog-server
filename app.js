const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('koa2-cors');
const koaJwt = require('koa-jwt');
const AutoRegRouter = require('./utils/initRoute');
const verifyToken = require('./middleware/verifytoken');
const errorHandler = require('./middleware/errorHandler');
const { createToken } = require('./utils/token');
const TOKEN_SECRET = 'my-blog-server';

// app.use(verifyToken);
app.use(cors());
app.use(errorHandler);
app.use(verifyToken);
// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
);

app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));
app.use((ctx, next) => {
  console.log(ctx);
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
      ctx.body = 'Protected resource, use Authorization header to get access\n';
    } else {
      throw err;
    }
  });
});
// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
AutoRegRouter.initCore(app);

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
