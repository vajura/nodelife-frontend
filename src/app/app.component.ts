import { Component, OnInit } from '@angular/core';
import { CellInterface } from '../commons/interfaces/cell-interface';
import { SocketEventEnum } from '../commons/enums/socket-event-enum';
import * as io from 'socket.io-client';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  implements OnInit {

  width = 1500;
  height = 800;
  canvas: any;
  ctx: any;
  container: any;

  constructor() {

  }


  ngOnInit() {
    this.canvas = <HTMLCanvasElement>document.getElementById('container');
    this.ctx = this.canvas.getContext('2d');
    this.container = $('container');

    this.createPlayerControls();

    const socket: SocketIOClient.Socket = io('http://localhost:3001', {transports: ['websocket', 'polling', 'flashsocket']});
    socket.on('connect', () => {
      console.log('Connected');
    });
    socket.on('disconnect', () => {
      console.log('Disconnected');
    });
    socket.on(SocketEventEnum.updateField, (data: CellInterface[])  => {
      this.updateField(data);
    });
    socket.emit('settings', {});
  }

  createPlayerControls() {
    this.container.on('mousedown', () => {

    });
    this.container.on('click touch', () => {

    });
  }

  updateField(data: CellInterface[]) {
    const imageData = this.ctx.createImageData(this.width, this.height);
    const data32 = new Uint32Array(imageData.data.buffer);
    for (let a = 0; a < data.length; a++) {
      data32[data[a].x + data[a].y * this.width] = data[a].color;
    }
    this.ctx.putImageData(imageData, 0, 0);
  }
}
