declare var io: SocketIOClientStatic;

const width = 1500;
const height = 800;
const canvas = <HTMLCanvasElement>document.getElementById('container');
const ctx = canvas.getContext('2d');

function start() {
  console.log('aa');
  const socket: SocketIOClient.Socket = io('http://localhost:3001', {transports: ['websocket', 'polling', 'flashsocket']});
  socket.on('connect', () => {
    console.log('Connected');
  });
  socket.on('disconnect', () => {
    console.log('Disconnected');
  });
  socket.on('message', (data: any[])  => {
    fieldUpdate(data);
  });
}

function fieldUpdate(data: any[]) {
  const imageData = ctx.createImageData(width, height);
  const data32 = new Uint32Array(imageData.data.buffer);
  for (let a = 0; a < data.length; a++) {
    data32[data[a].x + data[a].y * width] = 0xFFFF0000;
  }
  ctx.putImageData(imageData, 0, 0);
}
