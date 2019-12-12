const articleModel = require('../dao/article');
class archiveController {
  /**
   * @func getArchive - 前台获取归档信息
   */
  static async getArchive(ctx) {
    try {
      const { current, pageSize, keywords, username } = ctx.query;
      let archives = await articleModel.findAllArticles(
        current,
        pageSize,
        keywords,
        username
      );
      if (archives) {
        ctx.body = {
          code: 0,
          data: {
            count: archives.count,
            archive: archives.rows
          },
          msg: '获取文章列表成功'
        };
      } else {
        ctx.body = {
          code: 1,
          msg: '获取失败'
        };
      }
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = archiveController;
