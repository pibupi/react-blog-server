const router = require('koa-router')();
const ArticleController = require('../../../controller/article');
router.prefix('/api/v1/web');

// 前台获取所有文章
router.get('/article/list', ArticleController.getArticleAllList);
// 前台获取文章详情
router.get('/article', ArticleController.getArticleById);
// 前台根据分类获取文章列表
router.get('/articleOfCategory/:id', ArticleController.getArticleOfCateogry);
module.exports = router;