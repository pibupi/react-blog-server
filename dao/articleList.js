const db = require('../models');
const Article = db.sequelize.import('../models/articlelist');
class ArticleModel {
  static async findArticleList() {
    return await Article.findAll();
  }
  static async createArticle(data) {
    return await Article.create({
      title:data.title,
      content:data.content,
      desc:data.desc
    })
  }
  static async findArticleById(id){
    return await Article.findOne({
      where:{id}
    })
  }
  static async updateArticle({content,title,desc,id}){
    return await Article.update({
      content,title,desc
    },{
      where:{id}
    })
  }
  static async deleteArticle(id) {
    console.log('id',id)
    return await Article.destroy({
      where:{id}
    })
  }
  // static async encrypt(password) {
  //   return encrypt(password);
  // }
  // static async createUser(data) {
  //   return await User.create({
  //     username: data.username,
  //     password: data.password
  //   });
  // }
  // static async verifyPassword(password, userpassword) {
  //   return await comparePassword(password, userpassword);
  // }
  // static async createToken(username, id) {
  //   return await createToken(username, id);
  // }
}
module.exports = ArticleModel;
