import {
  Component
} from "@angular/core";
import {
  io
} from 'socket.io-client';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  userName: string = '';
  messageText: string = '';
  messages: Array < any > = [];
  socket: any;
  constructor() {
    this.socket = io();
  }
  ngOnInit() {
    this.messages = new Array();
    this.listen2Events();
  }
  listen2Events() {
    this.socket.on("msg", (data: any) => {
      this.messages.push(data);
    });
  }
  sendMessage() {
    this.socket.emit("newMsg", this.messageText);
    this.messageText = "";
  }
}
