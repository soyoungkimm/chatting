const Sequelize = require('sequelize');

class Chat extends Sequelize.Model {
  static initiate(sequelize) {
    Chat.init({
      room: {
        type: Sequelize.STRING(50),
      },
      user: {
        type: Sequelize.STRING(50),
      },
      chat: Sequelize.STRING(1000),
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Chat',
      tableName: 'chats',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }
}

module.exports = Chat;
