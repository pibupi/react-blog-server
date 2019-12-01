const router = require('koa-router')();
const UserController = require('../../../controller/user');
router.prefix('/api/v1/admin');

// 注册
router.post('/user/register', UserController.register);
// 登录
router.post('/user/login', UserController.login);
// 获取用户
router.get('/user/getuser',UserController.getUsers)
// 删除用户
router.post('/user/delete',UserController.deleteUsers)
// 更新用户
router.post('/user/update',UserController.updateUsers)
module.exports = router;
