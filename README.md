### 项目地址：
[博客地址](http://www.xxhblog.com)   

### 项目介绍
* react-blog-server为博客服务端
* 前后端分离项目

### 技术栈
* Koa2
* Mysql
* Sequelize
* jwt
* bcryptjs
* Eslint + Prettier

### 预览

### 已实现功能

- [x] 登录、注册
- [x] github第三方授权
- [x] 文章
- [x] 上传
- [x] 评论
- [x] 分类
- [x] 文章及评论点赞

### 待实现功能

- [ ] 七牛cdn
- [ ] 推荐文章

### 项目启动
```
git clone git@github.com:zhanghe888/react-blog-server.git

cd react-blog-server

npm install

npm start
```

### 项目结构
```
react-blog-server
├─ .gitignore          // git忽略文件
├─ src
│    ├─ config         // 配置文件
│    ├─ controller     // 处理请求逻辑
│    ├─ dao            // 操作数据库
│    ├─ middleware     // 中间件
│    ├─ migrations     // 迁移文件
│    ├─ models         // 数据模型
│    ├─ public         // 静态文件目录
│    ├─ seeders        // 种子目录
│    ├─ utils          // 工具方法
└─ app.js         // 入口文件
```

### 未来
* 采用egg.js企业框架
* TypeScript重构此项目