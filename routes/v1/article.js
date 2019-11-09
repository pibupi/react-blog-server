const router = require('koa-router')();
const UserController = require('../../controller/article');
router.prefix('/api/v1');

router.get('/article/list', UserController.getArticleList);
// router.post('/article/login', UserController.login);
module.exports = router;
