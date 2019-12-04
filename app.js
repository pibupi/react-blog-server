const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('koa2-cors');
const AutoRegRouter = require('./utils/initRoute');
const verifyToken = require('./middleware/verifytoken');
const tokenUnAllowPath = require('./middleware/tokenUnAllowPath');
// middlewares
app.use(cors());
app.use(tokenUnAllowPath);
app.use(verifyToken);
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
);
// error handler
onerror(app);

app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

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
