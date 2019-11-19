const db = require('../models');
const User = db.sequelize.import('../models/user');
const { encrypt, comparePassword } = require('../utils/bcrypt');
const { createToken } = require('../utils/token');
class UserModel {
  /**
   * @func findUser -查找用户
   */
  static async findUser(username) {
    return await User.findOne({
      where: {
        username
      }
    });
  }
  /**
   * @func encrypt -密码加盐
   */
  static async encrypt(password) {
    return encrypt(password);
  }
  /**
   * @func createUser -创建用户
   * @param {String} displayName -昵称
   */
  static async createUser({ username, displayName, password }) {
    return await User.create({
      username,
      displayName,
      password
    });
  }
  /**
   * @func verifyPassword -验证用户输入密码与数据库中的是否一致
   * @param {String} password -数据库中该用户的密码
   * @param {String} userpassword -用户输入的密码
   */
  static async verifyPassword(password, userpassword) {
    return await comparePassword(password, userpassword);
  }
  /**
   * @func createToken -创建token
   */
  static async createToken(username, id) {
    return await createToken(username, id);
  }
}
module.exports = UserModel;
