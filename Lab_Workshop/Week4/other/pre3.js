let express = require('express');
let app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.get('/', function (req, res) {
    let randomId = Math.round(Math.random() * 100);
    res.render('index2.html', { username: "admin",id: randomId});
});
app.listen(5050);