let express = require('express');
let app = express();
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));
// parse application/json
app.use(express.json())
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.post('/data', function (req, res) {
    console.log(req.body.username);
    console.log(req.body.userage);
    res.send('Thank You')
})
app.listen(5050);