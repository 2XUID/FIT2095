let express = require('express');
let app = express.Router();
let db = [];

function generateList() {
    let st = '</br>';
    for (let i = 0; i < db.length; i++) {
        console.log(db[i]);
        st += db[i].id + ' | ' + db[i].title + ' | ' + db[i].author + ' | ' + db[i].topic + ' | ' + db[i].cost + ' | ' + '</br>';
    }
    return st;
}

app.get('/', function (req, res) {
    res.send('bookstore management system.');
});
app.get('/getallbooks', function (req, res) {
    res.send(generateList());
});
app.get("/addbook", function (req, res) { //http://localhost:5050/addbook?title=Harry%20Potter&author=%20J.%20K.%20Rowling&topic=fiction&cost=15
    let newRec = {
        id: Math.round(Math.random() * 1000),
        title: req.query.title, //Harry Potter
        author: req.query.author,
        topic: req.query.topic,
        cost: req.query.cost,
    };
    db.push(newRec);
    res.send(generateList());
});
//req.url,req.pathname,req.params,req.query
app.get("/deleteid/:id", function (req, res) {
    for (let i = 0; i < db.length; i++) {
        if (db[i].id === parseInt(req.params.id)) {
            db.splice(i, 1);
        }
    }
    res.send(generateList());

});
app.get("/getbookstorevalue", function (req, res) { //http://localhost:5050/getbookstorevalue
    let sum = 0;
    console.log(db[0].cost);
    for (let i = 0; i < db.length; i++) {
        sum += parseInt(db[i].cost);
    }
    res.send("sum is " + sum);
})

app.get("/test", function (req, res) {
    for (let i = 0; i < db.length; i++) {
        res.send(db[i].cost);
    }
})
module.exports = app;