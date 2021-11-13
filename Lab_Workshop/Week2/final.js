let http = require("http");
let url = require("url"); //parse
let fs = require("fs");

function getDaysDiff(d, m, y) {
    let returnValue = -1;
    let currentDay = new Date();
    currentDay.setDate(parseInt(d));
    currentDay.setMonth(parseInt(m) - 1); // months start from 0
    currentDay.setYear(parseInt(y));
    let firstDay = new Date("8/3/2020"); // first day in semester 2
    if (currentDay >= firstDay) {
        var diffDays = parseInt((currentDay - firstDay) / (1000 * 60 * 60 * 24)); //gives day difference 
        returnValue = (Math.floor(diffDays / 7) + 1);
    }
    return (returnValue);
}


http
    .createServer(function (req, res) {
        let reqUrl = req.url;
        let parseUrl = url.parse(reqUrl, true).pathname;
        let filename = "index.html";
        if (parseUrl !== '/whichweek/') {
            console.log("running switch");
            switch (parseUrl) {
                case "/":
                    filename = "index.html";
                    break;
                case "/assessments":
                    filename = "assessments.html";
                    break;
                case "/topics":
                    filename = "topics.html";
                    break;
                default:
                    filename = "error.html";
                    break;
            }
            fs.readFile(filename, function (error, content) {
                console.log("reading filename" + filename);
                res.writeHead(200, {
                    "Content-Type": "text/html",
                });
                res.end(content, "utf-8");
            });
        } else {
            //http://localhost:5500/whichWeek/?d=4&m=8&y=20
            console.log("starting which week");
            let query = url.parse(reqUrl, true).query;
            let week = getDaysDiff(query.d, query.m, query.y);
            console.log(week);
            if (week === -1) {
                res.writeHead(200, {
                    "Content-Type": "text/html",
                });
                res.end("ERROR: week before first week");
            } else if (week > 14) {
                res.writeHead(200, {
                    "Content-Type": "text/html",
                });
                res.end("ERROR: week after first week");
            } else {
                res.writeHead(200, {
                    "Content-Type": "text/html",
                });
                res.end("Current week is: " + week);
            }
        }
    })
    .listen(5500);