import { Component, OnInit } from '@angular/core';
import { CellInterface } from '../commons/interfaces/cell-interface';
import { SocketEventEnum } from '../commons/enums/socket-event-enum';
import * as io from 'socket.io-client';
import * as $ from 'jquery';
import { createPlayer, PlayerInterface } from '../commons/interfaces/player-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  implements OnInit {

  width = 800;
  height = 800;
  mainContainer: any;
  mainCanvas: any;
  mainCtx: any;
  uiContainer: any;
  uiCanvas: any;
  uiCtx: any;
  player: PlayerInterface = createPlayer();
  socket: SocketIOClient.Socket;

  constructor() {

  }

  ngOnInit() {
    this.mainContainer = $('#main-container');
    this.mainCanvas = <HTMLCanvasElement>document.getElementById('main-container');
    this.mainCtx = this.mainCanvas.getContext('2d');
    this.uiContainer = $('#ui-container');
    this.uiCanvas = <HTMLCanvasElement>document.getElementById('ui-container');
    this.uiCtx = this.uiCanvas.getContext('2d');

    this.createPlayerControls();
    this.updateUICanvas();

    this.socket = io('http://localhost:3001', {transports: ['websocket', 'polling', 'flashsocket']});
    this.socket.on('connect', () => {
      console.log('Connected');
    });
    this.socket.on('disconnect', () => {
      console.log('Disconnected');
    });
    this.socket.on(SocketEventEnum.updateField, (data: CellInterface[])  => {
      this.updateMainCanvas(data);
    });
    this.socket.emit('settings', {});

    this.player.viewPortW = this.width / this.player.zoom;
    this.player.viewPortH = this.height / this.player.zoom;
  }

  createPlayerControls() {
    let dragging = false;
    let previousX = 0;
    let previousY = 0;
    let mouseX = 0;
    let mouseY = 0;
    this.mainContainer.on('mousedown', () => {
      dragging = true;
    });
    this.mainContainer.on('mouseup', () => {
      dragging = false;
    });
    this.mainContainer.on('mouseleave', () => {
      dragging = false;
    });
    this.mainContainer.on('mousemove', (event: any) => {
      mouseX = event.pageX;
      mouseY = event.pageY;
      if (dragging) {
        this.player.viewPortX += Math.floor((mouseX - previousX) / 2);
        this.player.viewPortY += Math.floor((mouseY - previousY) / 2);
        this.player.viewPortX = this.clamp(this.player.viewPortX, 0, 5000 - this.player.viewPortW);
        this.player.viewPortY = this.clamp(this.player.viewPortY, 0, 5000 - this.player.viewPortH);
        this.socket.emit(SocketEventEnum.updatePlayerData, this.player);
        console.log(this.player);
      }
      previousX = mouseX;
      previousY = mouseY;
    });
    this.mainContainer.on('mousewheel', (e) => {
      if (e.originalEvent.wheelDelta / 120 > 0) {
        this.player.zoom *= 2;
      }
      else {
        this.player.zoom /= 2;
      }
      this.player.zoom = this.clamp(this.player.zoom, 1, 16);
      this.player.viewPortW = Math.floor(this.width / this.player.zoom);
      this.player.viewPortH = Math.floor(this.height / this.player.zoom);
      this.player.viewPortX = Math.floor(this.clamp(mouseX / this.player.zoom + this.player.viewPortX - this.player.viewPortW / 2,
        0, 5000 - this.player.viewPortW));
      this.player.viewPortY = Math.floor(this.clamp(mouseY / this.player.zoom + this.player.viewPortY - this.player.viewPortH / 2,
        0, 5000 - this.player.viewPortH));
      this.socket.emit(SocketEventEnum.updatePlayerData, this.player);
      console.log(this.player);
    });
    this.mainContainer.on('click touch', () => {
    });
  }

  updateMainCanvas(data: CellInterface[]) {
    const imageData = this.mainCtx.createImageData(this.width, this.height);
    const data32 = new Uint32Array(imageData.data.buffer);
    const heightRatio = this.height / this.player.viewPortH;
    const widthRatio = this.width / this.player.viewPortW;
    for (let a = 0; a < data.length; a++) {
      for (let b = 0; b < heightRatio; b++) {
        for (let c = 0; c < widthRatio; c++) {
          const xPos = (data[a].x - this.player.viewPortX) * widthRatio + b;
          const YPos = ((data[a].y - this.player.viewPortY) * heightRatio + c) * this.width;
          data32[xPos + YPos] = data[a].color;
        }
      }
    }
    this.mainCtx.putImageData(imageData, 0, 0);
  }

  updateUICanvas() {
    this.uiCtx.beginPath();
    this.uiCtx.moveTo(0, 0);
    this.uiCtx.lineTo(800, 0);
    this.uiCtx.lineTo(800, 800);
    this.uiCtx.lineTo(0, 800);
    this.uiCtx.lineTo(0, 0);
    this.uiCtx.stroke();
  }

  clamp(num: number, min: number, max: number) {
    if (num < min) {
      return min;
    }
    if (num > max) {
      return max;
    }
    return num;
  }
}
