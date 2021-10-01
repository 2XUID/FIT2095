const express = require("express");
const app = express();

app.use(function (req, res, next) {
    req.unitCode = 'FIT2095';
    req.weekNumber = 4;
    next();
});

app.get("/", function (req, res) {
    res.send(
        `The unit code is ${req.unitCode}  and we are in week ${req.weekNumber}`
    );
});

app.listen(5050);