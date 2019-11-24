class UploadController {
 /**
   * @func uploadImg - 图片上传
   */
  static async uploadImg(ctx) {
    ctx.body = {
      url: 'http://localhost:5001/upload/' + ctx.req.file.filename //返回文件名
    };
  }
}
module.exports = UploadController;
