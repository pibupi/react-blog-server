const router = require('koa-router')();
const multer = require('koa-multer');
const path = require('path');
const UploadController = require('../../../controller/upload');

/**
 * @func diskStorage - 处理文件上传
 * @func destination - 指定文件路径
 * @func filename - 指定文件名，文件名重复覆盖，后缀名发生改变
 */
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../../..', 'public/upload'));
  },
  filename: function(req, file, cb) {
    var ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext);
  }
});
let upload = multer({
  storage
});
router.prefix('/api/v1');
router.post('/upload', upload.single('image'), UploadController.uploadImg);
module.exports = router;
