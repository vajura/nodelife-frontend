declare var io: SocketIOClientStatic;

function start() {
  console.log('aa');
  const socket: SocketIOClient.Socket = io('http://localhost:3001', {transports: ['websocket', 'polling', 'flashsocket']});
  socket.on('connect', () => {
    console.log('Connected');
    socket.emit('message', 'THIS IS A TEST');
  });
  socket.on('message', (data: any)  => {
    console.log(data);
  });
  socket.on('disconnect', () => {
    console.log('Disconnected');
  });
}
