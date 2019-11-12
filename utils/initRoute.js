const requireDirectory = require('require-directory'); // 引入所有的路由模块实现自动注册路由
const Router = require('koa-router');
class AutoRegRouter {
  static initCore(app) {
    // 入口方法
    AutoRegRouter.app = app;
    AutoRegRouter.initLoadRouters();
  }
  static initLoadRouters() {
    const apiDirectory = `${process.cwd()}/routes/v1`;
    requireDirectory(module, apiDirectory, {
      visit: whenLoadModule
    });
    // 实现路由的自动注册
    function whenLoadModule(obj) {
      if (obj instanceof Router) {
        AutoRegRouter.app.use(obj.routes());
      }
    }
  }
}
module.exports = AutoRegRouter;
