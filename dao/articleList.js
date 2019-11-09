const db = require('../models');
const Article = db.sequelize.import('../models/articlelist');
class UserModel {
  static async findArticleList() {
    return await Article.findAll();
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
module.exports = UserModel;
