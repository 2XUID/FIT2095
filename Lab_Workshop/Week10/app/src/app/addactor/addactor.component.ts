import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-addactor",
  templateUrl: "./addactor.component.html",
  styleUrls: ["./addactor.component.css"],
})
export class AddactorComponent {
  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";
  constructor(private dbService: DatabaseService, private router: Router) {}
  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.router.navigate(["/listactors"]);
    });
  }
}