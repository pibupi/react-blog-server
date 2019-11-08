const db = require('../models');
const User = db.sequelize.import('../models/user');
class UserModel {
  static async createUser(data) {
    return await User.create({
      username: data.username,
      password: data.password
    });
  }
}
module.exports = UserModel;
