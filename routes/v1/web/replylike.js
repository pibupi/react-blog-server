const router = require('koa-router')();
const CmtReplylikeController = require('../../../controller/cmtreplylike');
router.prefix('/api/v1/web');

// 前台评论父级点赞
router.post('/click/replylike', CmtReplylikeController.replylike);
// 前台评论在级点赞
router.post('/click/child/replylike', CmtReplylikeController.replychildlike);
module.exports = router;
