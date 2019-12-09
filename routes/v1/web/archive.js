const router = require('koa-router')();
const archiveController = require('../../../controller/archive');
router.prefix('/api/v1/web');
// 前台获取归档信息
router.get('/archive', archiveController.getArchive);
module.exports = router;
