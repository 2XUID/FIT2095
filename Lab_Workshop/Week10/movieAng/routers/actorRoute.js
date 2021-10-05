const mongoose = require('mongoose');
const Actor = require('../models/actors');
const Movie = require('../models/movies');
module.exports = {
  getAll: function (req, res) {
    Actor.find({}).populate('movies').exec(function (err, actors) {
      if (err) {
        return res.status(404).json(err);
      } else {
        res.json(actors);
      }
    });
  },
  createOne: function (req, res) {
    let newActorDetails = req.body;
    newActorDetails._id = new mongoose.Types.ObjectId();
    let actor = new Actor(newActorDetails);
    actor.save(function (err) {
      res.json(actor);
    });
  },
  getOne: function (req, res) {
    Actor.findOne({
        _id: req.params.id
      })
      .populate('movies')
      .exec(function (err, actor) {
        if (err) return res.status(400).json(err);
        if (!actor) return res.status(404).json("No such actor");
        res.json(actor);
      });
  },
  updateOne: function (req, res) {
    Actor.findOneAndUpdate({
      _id: req.params.id
    }, req.body, function (err, actor) {
      if (err) return res.status(400).json(err);
      if (!actor) return res.status(404).json("No such actor");
      res.json(actor);
    });
  },
  deleteOne: function (req, res) {
    Actor.findOneAndRemove({
      _id: req.params.id
    }, function (err) {
      if (err) return res.status(400).json(err);
      res.json("success");
    });
  },
  addMovie: function (req, res) {
    Actor.findOne({
      _id: req.params.id
    }, function (err, actor) {
      if (err) return res.status(400).json(err);
      if (!actor) return res.status(404).json("No such actor");
      Movie.findOne({
        _id: req.body.id
      }, function (err, movie) {
        if (err) return res.status(400).json(err);
        if (!movie) return res.status(404).json("No such movie");
        actor.movies.push(movie._id);
        actor.save(function (err) {
          if (err) return res.status(500).json(err);
          res.json(actor);
        });
      })
    });
  },
  deleteOneActorsWithMovies: function (req, res) {
    Actor.findOne({
      _id: req.params.id
    }, function (err, actors) {
      if (err) return res.status(400).json(err);
      if (!actors) return res.status(404).json('No that actor');
      for (let i = 0; i < actors.movies.length; i++) {
        console.log(actors.movies[i]._id)
        Movie.findOneAndRemove({
          _id: actors.movies[i]._id
        }, function (err) {
          if (err) return res.status(400).json(err);
        });
      }
    });
    Actor.findOneAndRemove({
      _id: req.params.id
    }, function (err, actors) {
      if (err) return res.status(400).json(err);
      res.json(actors);
    });
  },
  removeMoviesFromActors: function (req, res) {
    Actor.findOne({
      _id: req.params.actorID
    }, function (err, actors) {
      let i = actors.movies.indexOf(req.params.movieID)
      if (i != -1) {
        actors.movies.splice(i, 1);
        actors.save(function (err) {
          if (err) return res.status(500).json(err);
          res.json(actors);
        });
      } else {
        if (err) return res.status(400).json(err);
        if (!actors) return res.status(404).json("No such actor");
      };
    });
  },
};
