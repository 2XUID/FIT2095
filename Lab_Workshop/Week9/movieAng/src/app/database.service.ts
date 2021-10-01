import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};
@Injectable({
  providedIn: "root",
})
export class DatabaseService {
  constructor(private http: HttpClient) {}
  result: any;
  //Actor Part
  getActors() {
    return this.http.get("/actors");
  }
  createActor(data: any) {
    return this.http.post("/actors", data, httpOptions);
  }
  getOneActor(id: string) {
    let url = "/actors/" + id;
    return this.http.get(url);
  }
  updateActor(id: string, data: any) {
    let url = "/actors/" + id;
    return this.http.put(url, data, httpOptions);
  }
  deleteActor(id: string) {
    let url = "/actors/" + id;
    return this.http.delete(url, httpOptions);
  }
  //Movie part
  getMovies() {
    return this.http.get('/movies');
  }
  createMovie(data: any) {
    return this.http.post('/movies', data, httpOptions);
  }
  getOneMovie(id: string) {
    let url = '/movies/' + id;
    return this.http.get(url);
  }
  updateMovie(id: string, data: any) {
    let url = '/movies/' + id;
    return this.http.put(url, data, httpOptions);
  }
  deleteMovie(id: string) {
    let url = '/movies/' + id;
    return this.http.delete(url, httpOptions);
  }
  deleteMovieYear(year1: number, year2: number) {
    let url = '/movies/deleteYear/'+year1+'/'+year2;
    return this.http.delete(url, httpOptions);
  }
  deleteMovieTitle(title:string){
    let url = '/movies/deleteTitle/'+title;
    return this.http.delete(url, httpOptions);
  }
  addActorToMovie(movieID: string, actorID: string){
    let url = '/movies/'+movieID+'/'+actorID;
    return this.http.post(url, httpOptions);
  }
}