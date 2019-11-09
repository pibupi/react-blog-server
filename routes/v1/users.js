const router = require('koa-router')();
const UserController = require('../../controller/user');
router.prefix('/api/v1');

router.post('/user/register', UserController.register);
router.post('/user/login', UserController.login);
module.exports = router;
