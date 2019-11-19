const router = require('koa-router')();
const CategoryController = require('../../controller/category');
router.prefix('/api/v1');

// 获取分类列表
router.get('/category/list', CategoryController.getCategoryList);
// 添加分类
router.post('/category/add', CategoryController.addCategory);
// 更新分类
router.post('/category/update', CategoryController.updateCategory);
// 删除分类
router.post('/category/delete', CategoryController.deleteCategory);
// 获取所有分类
router.get('/category/all', CategoryController.getCategoryAll);
module.exports = router;
