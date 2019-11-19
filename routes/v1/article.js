const router = require('koa-router')();
const ArticleController = require('../../controller/article');
router.prefix('/api/v1');
// 获取文章列表
router.get('/article/list', ArticleController.getArticleList);
// 新增文章
router.post('/article/add', ArticleController.addArticleList);
// 更新文章
router.post('/article/update', ArticleController.updateArticle);
// 删除文章
router.post('/article/delete', ArticleController.deleteArticle);
// 前台获取所有文章
router.get('/article/all', ArticleController.getArticleAllList);
// 前台获取文章详情
router.get('/article/:id', ArticleController.getArticleById);
module.exports = router;
