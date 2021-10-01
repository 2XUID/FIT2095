
const express = require("express");
const mongodb = require("mongodb");
const ejs = require("ejs");
const app = express();
app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.use(express.static("public"));
app.use(express.urlencoded({
    extended: false
}));

const MongoClient = mongodb.MongoClient;
const url = "mongodb://10.152.168.99/";
let db;
MongoClient.connect(url, {
    useNewUrlParser: true
}, function (err, client) {
    if (err) {
        console.log("Err  ", err);
    } else {
        console.log("Connected successfully to server");
        db = client.db("agency");
    }
});

app.post("/postbooking", function (req, res) {
    let details = req.body;
    db.collection("booking").insertOne({
        source: details.source,
        target: details.target,
        airline: details.airline,
    });
});
app.listen(68153);