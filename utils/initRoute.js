const requireDirectory = require('require-directory'); // 引入所有的路由模块实现自动注册路由
const Router = require('koa-router');
class AutoRegRouter {
  /**
   * @func initCore - 入口
   * @param {Func} app - koa实例
   */
  static initCore(app) {
    AutoRegRouter.app = app;
    AutoRegRouter.initLoadRouters();
  }
  /**
   * @func initLoadRouters - 初始化路由文件
   */
  static initLoadRouters() {
    const apiDirectory = `${process.cwd()}/routes/v1`;
    requireDirectory(module, apiDirectory, {
      visit: whenLoadModule
    });
    /**
     * @func initLoadRouters - 实现路由的自动注册
     */
    function whenLoadModule(obj) {
      if (obj instanceof Router) {
        AutoRegRouter.app.use(obj.routes());
      }
    }
  }
}
module.exports = AutoRegRouter;
