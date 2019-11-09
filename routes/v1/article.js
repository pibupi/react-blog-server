const router = require('koa-router')();
const ArticleController = require('../../controller/article');
router.prefix('/api/v1');

router.get('/article/list', ArticleController.getArticleList);
module.exports = router;
