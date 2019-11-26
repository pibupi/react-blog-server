const router = require('koa-router')();
const CmtReplylikeController = require('../../../controller/cmtreplylike');
router.prefix('/api/v1/web');

// 前台文章点赞
router.post('/click/replylike', CmtReplylikeController.replylike);
router.post('/click/child/replylike', CmtReplylikeController.replychildlike);
module.exports = router;