const moment = require('moment')
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "category",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      category_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        get() {
          return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss')
        }
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
        get() {
          return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss')
        }
      }
    },
    {
      tableName: "category",
      charset: "utf8mb4",
      collate: "utf8mb4_bin",
      timestamps: true
    }
  );

  // Category.associate = models => {
  //   Category.hasMany(models.article)
  // }
  return Category;
};
