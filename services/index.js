const Room = require('../models/room');
const Chat = require('../models/chat');

exports.removeRoom = async (roomId) => {
  try {
    await Room.destroy({
      where: { id: roomId }
    });
    await Chat.destroy({ 
      where: { id: roomId }
    });
  } catch (error) {
    throw error;
  }
};
