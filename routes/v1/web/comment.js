const router = require('koa-router')();
const CommentController = require('../../../controller/comment');
router.prefix('/api/v1/web');

// 添加子评论
router.post('/comment/answer/add', CommentController.addAnswerComment);
// 添加评论
router.post('/comment/add', CommentController.addComment);
module.exports = router;
