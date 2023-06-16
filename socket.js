const SocketIO = require('socket.io');
const { removeRoom } = require('./services');

module.exports = (server, app, sessionMiddleware) => {
  const io = SocketIO(server, { path: '/socket.io' });
  app.set('io', io);
  const room = io.of('/room');
  const chat = io.of('/chat');

  const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
  chat.use(wrap(sessionMiddleware));

  room.on('connection', (socket) => {
    console.log('room 네임스페이스에 접속');
    socket.on('disconnect', () => {
      console.log('room 네임스페이스 접속 해제');
    });
  });

  chat.on('connection', (socket) => {
    console.log('chat 네임스페이스에 접속');

    // socket.on('connection', (data) => {
    //   socket.join(data);
    //   socket.to(data).emit('join', {
    //     user: 'system',
    //     chat: `${socket.request.session.color}님이 입장하셨습니다.`,
    //   });
    // });
    socket.on('join', function (name) {
      console.log('채팅방 입장');

      socket.name = name;
      var message = name + '님이 접속했습니다';

      socket.emit('addMessage', {
          name: 'SERVER',
          message: message
      });
      
    });
    socket.on('reply', (data) => { // reply라는 이벤트로 송신오면 메세지가 data인수에 담김
      //console.log('data : ', data);
      console.log('-------------------채팅보냄');
      socket.emit('news', data);
   });
    socket.on('disconnect', async () => {
      console.log('chat 네임스페이스 접속 해제');
      // const { referer } = socket.request.headers; // 브라우저 주소가 들어있음
      // const roomId = new URL(referer).pathname.split('/').at(-1);
      // const currentRoom = chat.adapter.rooms.get(roomId);
      // const userCount = currentRoom?.size || 0;
      // if (userCount === 0) { // 유저가 0명이면 방 삭제
      //   await removeRoom(roomId); // 컨트롤러 대신 서비스를 사용
      //   room.emit('removeRoom', roomId);
      //   console.log('방 제거 요청 성공');
      // } else {
      //   socket.to(roomId).emit('exit', {
      //     user: 'system',
      //     chat: `${socket.request.session.color}님이 퇴장하셨습니다.`,
      //   });
      // }
    });
  });
};
