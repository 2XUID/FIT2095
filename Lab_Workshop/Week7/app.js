const mongoose = require('mongoose');
const actors = require('./routers/actorRoute');
const movies = require('./routers/movieRoute');
const express = require("express");
const app = express();
const url = "mongodb://localhost:27017/FIT2095Lab9";
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
mongoose.connect(url, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Successfully connected");
});
app.listen(5050);
//Actor
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.delete('/actors/:id', actors.deleteOne);
app.post('/actors/:id/movies', actors.addMovie);
//new
app.delete('/actors/fullDelete/:id', actors.deleteOneActorsWithMovies); //
app.delete('/actors/:actorID/:movieID', actors.removeMoviesFromActors);//
//Movie
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
//new
app.delete('/movies/:id', movies.deleteOne);
app.delete('/movies/deleteYear/:year1/:year2', movies.deleteMovieYear);
app.delete('/movies/deleteTitle/:title', movies.deleteMovieTitle);
app.post('/movies/:movieID/:actorID', movies.addActor);
app.delete('/movies/:movieID/:actorID', movies.removeActorsFromMovies);//
app.get('/movies/year/:year1/:year2', movies.getYearMovie);