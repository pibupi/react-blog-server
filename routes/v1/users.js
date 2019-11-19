const router = require('koa-router')();
const UserController = require('../../controller/user');
router.prefix('/api/v1');
// 注册
router.post('/user/register', UserController.register);
// 登录
router.post('/user/login', UserController.login);
module.exports = router;
