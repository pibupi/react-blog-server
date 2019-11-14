const router = require('koa-router')();
const multer = require('koa-multer');
const path  = require('path')
const ArticleController = require('../../controller/article');
const storage = multer.diskStorage({
  // 指定文件路径
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../..', 'public/upload'));
  },
  // 指定文件名
  // 文件名重复覆盖
  // 后缀名发生改变
  filename: function(req, file, cb) {
    console.log('file',file)
    // let fileFormat = (file.originalname).split('.')
    // cb(null,file.fieldname+'-'+Date.now()+'.'+fileFormat[fileFormat.length-1])
    // console.log(file);
    // let exts = file.originalname.split('.');
    // // 因为后缀名有可能是 xxx.xxx.xx.png
    // // 所以取最后一项最合理的
    // let ext = exts[exts.length - 1];
    // let tmpname = new Date().getTime() + parseInt(Math.random() * 9999);
    // cb(null, `${tmpname}.${ext}`);
    var ext = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + Date.now() + ext)

  }
});
let upload = multer({
  storage
});
router.prefix('/api/v1');

router.get('/article/list', ArticleController.getArticleList);
router.get('/article/:id', ArticleController.getArticleById)
router.post('/article/addArticle', ArticleController.addArticleList);
router.post('/article/update',ArticleController.updateArticle)
router.post('/article/delete',ArticleController.deleteArticle)
router.post('/upload', upload.single('image'), async(ctx,next)=>{
  console.log('abc')
  ctx.body = {
    url: 'http://localhost:5001/upload/'+ctx.req.file.filename//返回文件名
  }
})
module.exports = router;
