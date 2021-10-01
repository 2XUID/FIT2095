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

MongoClient.connect(url, {//The class MongoClient enables you to make successful MongoDB server connections with your code.
    useNewUrlParser: true
}, function (err, client) {
    if (err) {
        console.log("Err  ", err);
    } else {
        console.log("Connected successfully to server");
        db = client.db("FIT2095_BOOK");//cant get database then add database
    }
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

app.post("/addnewbook", function (req, res) {
    let details = req.body;
    if (details.title.length < 3 || details.author.length < 3 ||
        details.topic.length < 3) {
        console.log("Invalid");
        res.render("invaliddata");
    } else {
        db.collection("book").insertOne({
            title: details.title,
            author: details.author,
            topic: details.topic,
            date: details.date,
            summary: details.summary,
        });
        res.redirect("/getbook");
    }
});


app.get("/getbook", function (req, res) {
    db.collection("book")
        .find({})
        .toArray(function (err, data) { //if toarray() shows Promise Object
            res.render("listbook", {
                bookdb: data
            });
        });
});


app.get("/updatebook", function (req, res) {
    res.sendFile(__dirname + "/views/updatedata.html");
});

app.post("/updatebookdata", function (req, res) {
    let details = req.body;
    if (details.title.length < 3 || details.author.length < 3 ||
        details.topic.length < 3) {
        console.log("Invalid");
        res.render("invaliddata");
    } else {
        db.collection("book").updateMany({
            title: details.oldtitle
        }, {
            $set: {// replaces the value of a field with the specified value
                title: details.title,
                author: details.author,
                topic: details.topic,
                date: details.date,
                summary: details.summary,
            }
        });
        res.redirect("/getbook");
    }
});

app.get('/getbetweendate',function(req,res){
    db.collection("book").find({date:{$gte:"2020-08-27",$lt:"2021-08-27"}})
    .toArray(function (err, data) {
        res.render("listbook", {
            bookdb: data
        });
    });
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