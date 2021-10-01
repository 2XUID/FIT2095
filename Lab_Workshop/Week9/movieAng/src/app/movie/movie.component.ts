import {
  Component,
  OnInit
} from '@angular/core';
import {
  DatabaseService
} from '../database.service';
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  constructor(private dbService: DatabaseService) {}
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
  //Some tools
  ngOnInit(): void {
    this.onListMovies();
  }
  resetAll() {
    this.title = '';
    this.year = 0;
    this.year1 = 0;
    this.year2 = 0;
    this.movieID = '';
    this.actorID = ''
    this.name = '';
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
  changeSection(sectionId: number) {
    this.resetAll();
    this.section = sectionId;
  }
  onGetActors(){
    this.dbService.getActors().subscribe((data:any) => {
      this.actorData = data;
    });
  }
  onListMovies() {
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
  onCreateMovie() {
    let obj = {
      title: this.title,
      year: this.year
    };
    this.dbService.createMovie(obj).subscribe((result) => {
      this.onListMovies();
      this.resetAll();
    });
  }
  onUpdateMovie() {
    let obj = {
      title: this.title,
      year: this.year
    };
    this.dbService.updateMovie(this.movieID, obj).subscribe((result) => {
      this.onListMovies();
      this.resetAll();
    });
  }
  // Delete Movie
  onDeleteMovie(item: any) {
    this.dbService.deleteMovie(item._id).subscribe((result) => {
      this.onListMovies();
      this.resetAll();
    });
  }
  // Delete Movie Between Years
  onDeleteMovieYear() {
    this.dbService.deleteMovieYear(this.year1, this.year2).subscribe((result) => {
      this.onListMovies();
      this.resetAll();
    });
  }
  onDeleteMovieTitle() {
    this.dbService.deleteMovieTitle(this.title).subscribe((result) => {
      this.onListMovies();
      this.resetAll();
    });
  }

  onAddActorToMovie() {
    this.dbService.addActorToMovie(this.movieID, this.actorID)
      .subscribe((result) => {
        this.onListMovies();
      });
  }
}
