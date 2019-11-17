const router = require('koa-router')();
const multer = require('koa-multer');
const path  = require('path')
const ArticleController = require('../../controller/article');
// const ArticleModel = require('../../dao/articleList')
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
router.get('/article/alllist', ArticleController.getArticleAllList);
router.get('/article/:id', ArticleController.getArticleById)
router.post('/article/addArticle', ArticleController.addArticleList);
// router.post('/article/addArticle',  upload.single('image'), (ctx,next)=>{
//   console.log('ctx',ctx)
//   ctx.body = {
//     url: 'http://localhost:5001/upload/'+ctx.req.file.filename,//返回文件名
//     code:0,
//     msg:'创建成功'
//   }
// });
router.post('/article/update',ArticleController.updateArticle)
router.post('/article/delete',ArticleController.deleteArticle)
// router.post('/upload', upload.single('image'), ArticleController.uploadImg)
router.post('/upload', upload.single('image'), async(ctx,next)=>{
  console.log('abc')
  console.log(ctx.req)
  ctx.body = {
    url: 'http://localhost:5001/upload/'+ctx.req.file.filename//返回文件名
    // code:0
  }
})
// router.post('/upload/title', upload.single('image'), ArticleController.uploadImg)
// router.post('/upload/title', upload.single('image'), async(ctx,next)=>{
  // console.log('abc')
  // console.log('ctx.req.file',)
  // let { mimetype } = ctx.req.file;
  //   // let {mimetype} = ctx;
  //   console.log(mimetype)
  //   let types = ['jpg', 'jpeg', 'png', 'gif']; // 允许上传的数据类型
  //   let tmpType = mimetype.split('/')[1];
  //   // if (size > 500000) {
  //   //   // return res.send({ errO: -1, msg: '尺寸过大' });
  //   //   ctx.body = {
  //   //     code: 1,
  //   //     msg: '尺寸过大'
  //   //   };
  //   // } else 
  //   if (types.indexOf(tmpType) == -1) {
  //     // return res.send({ err: -1, msg: '媒体类型错误' });
  //     ctx.body = {
  //       code: 1,
  //       msg: '媒体类型错误'
  //     };
  //   } else {
  //     let url = 'http://localhost:5001/upload/'+ctx.req.file.filename//返回文件名
  //     // const res = await ArticleController.
  //     // res.send({ code: 0, msg: '上传成功', img: url });
  //     ctx.body = {
  //       code: 0,
  //       msg: '上传成功',
  //       imgUrl: url
  //     };
  //   }
    // });
  // ctx.body = {
    // url: 'http://localhost:5001/upload/'+ctx.req.file.filename//返回文件名
    // code:0
  // }
// })
module.exports = router;
