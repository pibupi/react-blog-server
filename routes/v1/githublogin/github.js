const router = require('koa-router')();
const UserController = require('../../../controller/user');
router.prefix('/api/v1');
// github登录
router.get('/oauth/redirect', UserController.oauth);
module.exports = router;
