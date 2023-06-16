const Room = require('../models/room');
const Chat = require('../models/chat');
const { removeRoom: removeRoomService } = require('../services'); 

exports.renderMain = async (req, res, next) => {
  try {
    const rooms = await Room.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.render('main', {rooms});
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.renderRoom = (req, res) => {
  res.render('room');
};

exports.createRoom = async (req, res, next) => {
  try {
    await Room.create({
      title: req.body.title,
      max: req.body.max
    });
    res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.enterRoom = async (req, res, next) => {
  try {
    const room = await Room.findOne({ id: req.params.id });
    if (!room) {
      return res.redirect('/?error=존재하지 않는 방입니다.');
    }
   
    // if (room.max <= rooms.get(req.params.id)?.size) {
    //   return res.redirect('/?error=허용 인원이 초과하였습니다.');
    // }



    const chats = await Chat.findAll({
      order: [['createdAt', 'ASC']],
    });
    console.log(chats);

    return res.render('chat', {
      room,
      title: room.title,
      chats,
      user: req.param('name'),
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// exports.removeRoom = async (req, res, next) => {
//   try {
//     await removeRoomService(req.params.id);
//     res.send('ok');
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// };

exports.sendChat = async (req, res, next) => {
  try {
    const chat = await Chat.create({
      room: req.params.id,
      user: req.body.user,
      chat: req.body.chat,
    });
    //console.log("sendChat  :", req.body.user);
    // 서버에게 메세지 송신
    //req.app.get('io').of('/chat').to(req.params.id).emit('chat', chat);
    //res.send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// exports.sendGif = async (req, res, next) => {
//   try {
//     const chat = await Chat.create({
//       room: req.params.id,
//       user: req.session.color,
//       gif: req.file.filename,
//     });
//     req.app.get('io').of('/chat').to(req.params.id).emit('chat', chat);
//     res.send('ok');
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// };
