const moment = require('moment');
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'comment',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      article_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      displayName: {
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
      }
    },
    {
      tableName: 'comment',
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin',
      timestamps: true
    }
  );
  return Comment;
};
