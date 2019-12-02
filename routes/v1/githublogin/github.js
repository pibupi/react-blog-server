const router = require('koa-router')();
const UserController = require('../../../controller/user');

// github登录
router.get('/oauth/redirect', UserController.oauth);
module.exports = router;
