import { Component, OnInit } from '@angular/core';
import {DatabaseService} from "src/app/database.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-deletemovie',
  templateUrl: './deletemovie.component.html',
  styleUrls: ['./deletemovie.component.css']
})
export class DeletemovieComponent implements OnInit {

  constructor(private dbService: DatabaseService, private router: Router) {}
  movieData: any[] = [];
  year: number = 0;
  ngOnInit(): void {
    this.onListMovies()
  }
  onListMovies() {
    this.dbService.getMovies().subscribe((data: any) => {
      this.movieData = data;
    });
  }
  onDeleteMovie(item: any) {
    this.dbService.deleteMovie(item._id).subscribe((result) => {
      this.onListMovies();
    });
  }
}
