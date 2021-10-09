let express = require("express");
let path = require("path");
let app = express();
let server = require("http").Server(app);
let io = require("socket.io")(server);
let port = 5050;
app.use("/", express.static(path.join(__dirname, "dist/manager")));
io.on("connection", socket => {
  console.log("new connection made from client with ID=" + socket.id);
  socket.on("newMsg", data => {
    io.sockets.emit("msg", {
      msg: data,
      timeStamp: getCurrentDate()
    });
  });
});
server.listen(port, () => {
  console.log("Listening on port " + port);
});
