var Actor = require('../models/actors');
var Movie = require('../models/movies');
const mongoose = require('mongoose');
module.exports = {
    getAll: function (req, res) {
        Movie.find({}).populate('actors').exec(function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
        });
    },
    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },
    getOne: function (req, res) {
        Movie.findOne({
                _id: req.params.id
            })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json("No such movie");
                res.json(movie);
            });
    },
    updateOne: function (req, res) {
        Movie.findOneAndUpdate({
            _id: req.params.id
        }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json("No such movie");
            res.json(movie);
        });
    },
    deleteOne: (req, res) => {
        Movie.findByIdAndDelete({
                _id: req.params.id
            },
            function (err, data) {
                if (err) return res.status(400).json(err);
                if (data == null) return res.status(404).json('No movie with such ID!');
                res.json();
            });
    },
    removeActorsFromMovies: function (req, res) {
        Movie.findOne({
            _id: req.params.movieID
        }, function (err, movie) {
            let i = movie.actors.indexOf(req.params.actorID)
            if (i != -1) {
                movie.actors.splice(i, 1);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            } else {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json("No such movie");
            };
        });
    },
    addActor: function (req, res) {
        Movie.findOne({
            _id: req.params.movieID
        }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json("No such movie");
            Actor.findOne({
                _id: req.params.actorID
            }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json("The actor doesn't exist");
                movie.actors.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            });
        });
    },
    getYearMovie: function (req, res) {
        if (req.params.year1 > req.params.year2) {
            return res.status(405).json('Year 1 need to smaller than Year 2');
        } else {
            Movie.where('year').lte(req.params.year2).gte(req.params.year1).exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json("No such movie");
                res.json(movie);
                console.log(movie);
            });
        }
    },
    deleteMovieYear: function (req, res) {
        if (req.body.year1 > req.body.year2) {
            return res.status(405).json('Year 1 need to smaller than Year 2');
        } else {
            Movie.deleteMany({
                year: {
                    $lte: req.body.year2
                } || {
                    $gte: req.body.year1
                }
            }).exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json("No such movie");
                res.json(movie);
            });
        }
    },
    deleteMovieTitle:function (req, res) {
        Movie.deleteMany({
            title: req.params.title
            }).exec(function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json("No such movie");
            res.json(movie);
        });
    }
};