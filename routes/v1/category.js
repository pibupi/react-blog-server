const router = require('koa-router')();
const CategoryController = require('../../controller/category');
router.prefix('/api/v1');

router.post('/category/create', CategoryController.createCategory);
router.post('/category/delete', CategoryController.deleteCategory);
router.post('/category/update', CategoryController.updateCategory);
router.get('/category/get', CategoryController.getCategory);
router.get('/category/all', CategoryController.getCategoryAll);
module.exports = router;
