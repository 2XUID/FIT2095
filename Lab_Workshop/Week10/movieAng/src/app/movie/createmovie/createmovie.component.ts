import { Component, OnInit } from '@angular/core';
import {DatabaseService} from "src/app/database.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-createmovie',
  templateUrl: './createmovie.component.html',
  styleUrls: ['./createmovie.component.css']
})
export class CreatemovieComponent implements OnInit {

  constructor(private dbService: DatabaseService, private router: Router) {}
  title: string = '';
  year: number = 0;
  ngOnInit(): void {
  }
  onCreateMovie() {
    let obj = {
      title: this.title,
      year: this.year
    };
    this.dbService.createMovie(obj).subscribe((result) => {
      this.router.navigate(["/listmovies"]);
    });
  }
}
