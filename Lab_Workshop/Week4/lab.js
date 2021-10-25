// Allow Express to understand the urlencoded format
// Express use render ejs
// Static assets for images
let express = require('express');
let app = express();
const viewsPath = __dirname + "/views/";
let db = [];
app.use(express.static("views/img"));
app.use(express.static("views/css"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(express.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    console.log("Homepage request");
    let fileName = viewsPath + "homepage.html";
    res.sendFile(fileName);
});

app.get("/putnewbooks", function (req, res) {
    let fileName = viewsPath + "newbooks.html";
    res.sendFile(fileName);
});

app.get("/listallbooks", function (req, res) {
    res.render("listbooks", {
        books: db,
    });
});

app.post("/addnewbooks", function (req, res) {
    db.push(req.body);
    if (req.body.title.length <= 3 && req.body.author.length <= 3 && req.body.topic.length <= 3) {
        console.log("Invalid");
        res.render("invaliddata");
    } else {
        console.log("OK");
        res.render("listbooks", {
            books: db,
        });
    }
});

app.get('*', function (req, res){
    console.log('404 handler..')
    let fileName = viewsPath + "404.html";
    res.sendFile(fileName);
});


app.listen(5050);