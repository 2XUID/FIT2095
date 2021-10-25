import {
  Component
} from '@angular/core';
import {
  io
} from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  socket: any;
  userName: string = '';
  texts: any[] = [];
  msgText: string = '';
  lang1: string = '';
  lang2: string = '';
  constructor() {
    this.socket = io();
  }
  ngOnInit() {
    this.texts = new Array();
    this.socket.on("translation", (data) => {
      this.texts.push(data);
    });
  }
  sendText() {
    let data1 = {
      user: this.userName,
      text: this.msgText,
      lang: this.lang1
    }
    let data2 = {
      user: this.userName,
      text: this.msgText,
      lang: this.lang2
    }
    this.socket.emit("newText", data1, data2);
  }
}
