const express = require("express");
const mongodb = require("mongodb");
const ejs = require("ejs");
const app = express();
app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.use(express.static("public"));
app.use(express.urlencoded({
    extended: true
}));
app.listen(5050);
const MongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017/";
let db;

MongoClient.connect(url, {
    useNewUrlParser: true
}, function (err, client) {
    if (err) {
        console.log("Err  ", err);
    } else {
        console.log("Connected successfully to server");
        db = client.db("book");
    }
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

app.post("/addnewbook", function (req, res) {
    if (req.body.title.length < 3 || req.body.author.length < 3 ||
        req.body.topic.length < 3 || req.body.cost < 0) {
        console.log("Invalid");
        res.render("invaliddata");
    } else {
        let details = req.body;
        db.collection("book").insertOne({
            title: details.title,
            author: details.author,
            topic: details.topic,
            date: details.date,
            summary: details.summary,
        });
        res.redirect("/getbook"); // redirect the client to list users page
    }
});


app.get("/getbook", function (req, res) {
    db.collection("book")
        .find({})
        .toArray(function (err, data) {
            res.render("listbook", {
                bookdb: data
            });
        });
});


app.get("/updatebook", function (req, res) {
    res.sendFile(__dirname + "/views/updatebookdata.html");
});

app.post("/updatebookdata", function (req, res) {
    if (req.body.title.length < 3 || req.body.author.length < 3 ||
        req.body.topic.length < 3 || req.body.cost < 0) {
        console.log("Invalid");
        res.render("invaliddata");
    } else {
        let details = req.body;
        let filter = {
            name: details.oldtitle
        };
        let theUpdate = {
            $set: {
                title: details.title,
                author: details.author,
                topic: details.topic,
                date: details.date,
                summary: details.summary,
            },
        };
        db.collection("book").updateOne(filter, theUpdate);
        res.redirect("/getusers"); // redirect the client to list users page
    }
});


app.get("/deletebook", function (req, res) {
    res.sendFile(__dirname + "/views/deletebook.html");
});

app.post("/deletebookdata", function (req, res) {
    let details = req.body;
    db.collection("book").deleteMany({
        topic: details.topic
    });
    res.redirect("/getbook");
});

app.get('*', function (req, res) {
    let fileName = __dirname + "/views/404.html";
    res.sendFile(fileName);
});