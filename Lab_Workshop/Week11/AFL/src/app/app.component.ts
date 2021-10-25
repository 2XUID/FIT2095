import {
  Component
} from '@angular/core';
import {
  io
} from 'socket.io-client';
import {
  ChartType,
  ChartOptions
} from 'chart.js';
import {
  SingleDataSet,
  Label
} from 'ng2-charts';
import {
  monkeyPatchChartJsLegend
} from 'ng2-charts';
import {
  monkeyPatchChartJsTooltip
} from 'ng2-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartOptions: ChartOptions = {
    responsive: true
  };
  public pieChartType: ChartType = "pie";
  public pieChartLegend = true;
  public pieChartPlugins = [];
  title = 'AFL';
  socket: any;
  ticketNumber: number = 0;
  Object: any = {};
  select: any = null;
  total: number = 0;
  label: any[] = [];
  data: any[] = [];
  constructor() {
    this.socket = io();
    monkeyPatchChartJsLegend();
    monkeyPatchChartJsTooltip();
  }
  ngOnInit() {
    this.listenToEvents();
  }
  delete(){
    let ticketInfo={
      select:this.select
    };
    this.socket.emit("delete",ticketInfo);
  }
  listenToEvents() {
    this.socket.on("teams", (data: any) => {
      this.Object = data;
      this.label = this.Object.teams.map((obj1: {
        text: any;
      }) => obj1.text);
      this.data = this.Object.teams.map((obj2: {
        count: any;
      }) => obj2.count);
    });
    this.socket.on("total", (data: any) => {
      this.total = data;
    })
  }
  purchaseTicket() {
    let ticketInfo = {
      ticketNumber: this.ticketNumber,
      select: this.select
    };
    this.socket.emit("newPurchase", ticketInfo);
  }
}
