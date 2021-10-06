import { Component, OnInit } from '@angular/core';
import {DatabaseService} from "src/app/database.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-listmovies',
  templateUrl: './listmovies.component.html',
  styleUrls: ['./listmovies.component.css']
})
export class ListmoviesComponent implements OnInit {

  constructor(private dbService: DatabaseService, private router: Router) {}
  movieData: any[] = [];
  ngOnInit(): void {
    this.dbService.getMovies().subscribe((data: any) => {
      this.movieData = data;
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
}
