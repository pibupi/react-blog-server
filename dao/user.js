const db = require('../models');
const User = db.sequelize.import('../models/user');
const { encrypt, comparePassword } = require('../utils/bcrypt');
const { createToken } = require('../utils/token');
class UserModel {
  static async findUser(username) {
    return await User.findOne({ where: { username } });
  }
  static async encrypt(password) {
    return encrypt(password);
  }
  static async createUser(data) {
    return await User.create({
      username: data.username,
      password: data.password
    });
  }
  static async verifyPassword(password, userpassword) {
    return await comparePassword(password, userpassword);
  }
  static async createToken(username, id) {
    return await createToken(username, id);
  }
}
module.exports = UserModel;
