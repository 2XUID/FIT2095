let express = require("express");
let path = require("path");
let app = express();
let server = require("http").Server(app);
let io = require("socket.io")(server);
let port = 5050;
app.use("/", express.static(path.join(__dirname, "dist/AFL")));
const teamsObj = require("./teams");
let total = 0;
server.listen(port, () => {
  console.log("Listening on port " + port);
});
io.on("connection", socket => {
  console.log("successful connection")
  socket.emit("teams", teamsObj);
  socket.on("newPurchase", data => {
    for (let i = 0; i < teamsObj.teams.length; i++) {
      if (data.select === teamsObj.teams[i].value) {
        teamsObj.teams[i].count += data.ticketNumber;
      }
    }
    total += data.ticketNumber;
    io.sockets.emit("teams", teamsObj);
    io.sockets.emit("total", total);
  });
});
