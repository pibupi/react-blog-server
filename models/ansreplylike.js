const moment = require('moment');
module.exports = (sequelize, DataTypes) => {
  const AnsReplylike = sequelize.define(
    'ansreplylike',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      reply_like_status: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        defaultValue: 0
      },
      article_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      user_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      answer_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true
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
      tableName: 'ansreplylike',
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin',
      timestamps: true
    }
  );
  return AnsReplylike;
};
