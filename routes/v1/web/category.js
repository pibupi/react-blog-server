const router = require('koa-router')();
const CategoryController = require('../../../controller/category');
router.prefix('/api/v1/web');

// 获取所有分类
router.get('/category/all', CategoryController.getCategoryAll);
module.exports = router;
