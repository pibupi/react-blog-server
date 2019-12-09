const db = require('../models');
const Op = db.Sequelize.Op;
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
   * @func findUserList -查找用户
   */
  static async findUserList(offset, limited, keywords) {
    return await User.findAndCountAll({
      where: {
        [Op.or]: [
          {
            username: {
              [Op.like]: '%' + keywords + '%'
            }
          }
        ]
      },
      offset: (offset - 1) * +limited,
      limit: +limited,
      order: [['id', 'DESC']]
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
  static async createUser({
    username,
    displayName,
    password,
    email,
    phone,
    auth
  }) {
    return await User.create({
      username,
      displayName,
      password,
      email,
      phone,
      auth
    });
  }
  /**
   * @func deleteUser -删除用户
   * @param {String} id - 用户id
   */
  static async deleteUser(id) {
    return await User.destroy({
      where: { id }
    });
  }
  /**
   * @func updateUser -更新用户
   * @param {String} id - 用户id
   */
  static async updateUser(username, displayName, id) {
    return await User.update(
      {
        username,
        displayName
      },
      {
        where: { id }
      }
    );
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
