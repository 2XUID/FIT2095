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
  lang: string = '';
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
    let data = {
      user: this.userName,
      text: this.msgText,
      lang: this.lang
    }
    this.socket.emit("newText", data);
  }
}
