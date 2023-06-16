const Sequelize = require('sequelize');

class Room extends Sequelize.Model {
  static initiate(sequelize) {
    Room.init({
      title: {
        type: Sequelize.STRING(140),
      },
      max:{
        type: Sequelize.INTEGER(10),
        //allowNull: false,
      },
      
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Room',
      tableName: 'rooms',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }
  
}

module.exports = Room;