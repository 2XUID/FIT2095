import { Component, OnInit} from "@angular/core";
import { DatabaseService } from "../database.service";
@Component({
  selector: "app-actor",
  templateUrl: "./actor.component.html",
  styleUrls: ["./actor.component.css"],
})
export class ActorComponent implements OnInit {
  actorData: any[] = [];
  section = 1;
  name: string = "";
  bYear: number = 0;
  actorID: string = "";
  resetAll() {
    this.name = '';
    this.bYear = 0;
    this.actorID = '';
  }
  constructor(private dbService: DatabaseService) {}
  //Get all Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data:any) => {
      this.actorData = data;
    });
  }
  //Create a new Actor, POST request
  onSaveActor() {
    let obj = { name: this.name, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
      this.resetAll();
    });
  }
  // Update an Actor
  onSelectMovie(item:any) {
    this.name = item.name;
    this.bYear = item.bYear;
    this.actorID = item._id;
  }
  onUpdateActor() {
    let obj = { name: this.name, bYear: this.bYear };
    this.dbService.updateActor(this.actorID, obj).subscribe(result => {
      this.onGetActors();
      this.resetAll()
    });
  }
  //Delete Actor
  onDeleteActor(item:any) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
      this.resetAll()
    });
  }
  ngOnInit() {
    this.onGetActors();
  }
  changeSection(sectionId:number) {
    this.section = sectionId;
    this.resetAll();
  }
  resetSection(){
    this.section = 1;
  }
}