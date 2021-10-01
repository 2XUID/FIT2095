import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.css']
})
export class ChangeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  section=1;
  count = 0;
  changeSection(sectionId:number){
    this.count = this.count+sectionId
    if (this.count%2==1){
      this.section=2;
    }
    else {
      this.section=1;
    }

  }

}
