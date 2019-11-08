const router = require('koa-router')();
const UserController = require('../../controller/user');
router.prefix('/api/v1');

router.post('/user/create', UserController.create);

module.exports = router;
