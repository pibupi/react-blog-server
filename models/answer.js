const moment = require('moment');
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define(
    'answer',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      parent_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      article_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      displayName: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      answerContent: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      reply_like_count: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        defaultValue: 0
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
      tableName: 'answer',
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin',
      timestamps: true
    }
  );
  return Answer;
};
