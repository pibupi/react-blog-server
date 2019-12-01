const moment = require('moment');
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'role',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      role_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
      },
      auth_name: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      auth_time: {
        type: DataTypes.DATE,
        allowNull: false,
        get() {
          return moment(this.getDataValue('createdAt')).format(
            'YYYY-MM-DD HH:mm:ss'
          );
        }
      },
      permission_ids: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        get() {
          return moment(this.getDataValue('createdAt')).format(
            'YYYY-MM-DD HH:mm:ss'
          );
        }
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
        get() {
          return moment(this.getDataValue('createdAt')).format(
            'YYYY-MM-DD HH:mm:ss'
          );
        }
      }
    },
    {
      tableName: 'role',
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin',
      timestamps: true
    }
  );
  return Role;
};
