const router = require('koa-router')();
const likeController = require('../../../controller/like');
router.prefix('/api/v1/web');

// 前台文章点赞
router.post('/click/like', likeController.clickLikeArticle);
module.exports = router;
