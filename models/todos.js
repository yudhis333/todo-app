'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      todos.belongsTo(models.users, { foreignKey: "user_id" });
    }
  }
  todos.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    priority: DataTypes.STRING,
    duedate: DataTypes.STRING,
    duetime: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'todos',
  });
  return todos;
};