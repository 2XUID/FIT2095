import { Component, OnInit } from '@angular/core';
import {DatabaseService} from "src/app/database.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-addactortomovie',
  templateUrl: './addactortomovie.component.html',
  styleUrls: ['./addactortomovie.component.css']
})
export class AddactortomovieComponent implements OnInit {

  constructor(private dbService: DatabaseService, private router: Router) {}
  //Movie
  movieData: any[] = [];
  section:number = 1;
  title: string = '';
  year: number = 0;
  movieID: string = '';
  actors: any[] = [];
  year1: number = 0;
  year2: number = 0;
  //Actor
  actorData: any[] = [];
  actorID: string = '';
  name: string = '';
  bYear: number = 0;
  movies: any[] = [];
  ngOnInit(): void {
    this.onGetActors()
    this.onListMovies()
  }
  onGetActors(){
    this.dbService.getActors().subscribe((data:any) => {
      this.actorData = data;
    });
  }
  onGetActorInMovie(actorsArray: any[]) {
    let list = '';
    if (actorsArray.length > 1) {
      for (let i = 0; i < actorsArray.length - 1; i++) {
        list = list + actorsArray[i].name + ', ';
      }
      list = list + actorsArray[actorsArray.length - 1].name;
    }else if(actorsArray.length==1){
      list = actorsArray[0].name;
    }
    return list;
  }
  onListMovies() {
    this.dbService.getMovies().subscribe((data: any) => {
      this.movieData = data;
    });
  }
  onSelectMovie(item: any) {
    this.title = item.title;
    this.year = item.year;
    this.movieID = item._id;
    this.actors = item.actors;
  }
  onSelectActor(item: any) {
    this.name = item.name;
    this.bYear = item.bYear;
    this.actorID = item._id;
    this.movies = item.movies;
  }
  onAddActorToMovie() {
    this.dbService.addActorToMovie(this.movieID, this.actorID)
      .subscribe((result) => {
        this.onListMovies();
      });
  }
}
