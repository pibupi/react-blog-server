module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '通过 bcrypt 加密后的密码'
      }
    },
    {
      tableName: 'user',
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin',
      timestamps: true
    }
  );
  return User;
};
