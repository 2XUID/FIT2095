const express = require("express");
const app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use(function (req, res, next) {
    req.unitCode = "FIT2095";
    req.weekNumber = 4;
    next();
});
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

//your code here

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post('/findmax', function (req, res) {
    let max = 0;
    if(req.body.value1>req.body.value2){
        max = req.body.value1;
    }else{
        max = req.body.value2;
    }
    res.render('response.html', {maxValue: max});
})

app.listen(5050);