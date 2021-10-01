let express = require('Express');
let ser = express();
let app = require('./app.js');
ser.use('/', app);
ser.listen(5050, () => {
    console.log("Start listening>>>");
});