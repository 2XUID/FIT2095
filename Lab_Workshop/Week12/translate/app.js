let express = require('express');
let app = express();
let server = require('http').Server(app);
let path = require('path');
let randomString = require("randomString");
let io = require('socket.io')(server);
let {
  Translate
} = require('@google-cloud/translate').v2;
let textToSpeech = require("@google-cloud/text-to-speech");
let fs = require("fs");
app.use("/", express.static(path.join(__dirname, "mp3")));
app.use("/", express.static(path.join(__dirname, "dist/translate")));
let projectId = "123"
let translate = new Translate({
  projectId
});
let textToSpeechClient = new textToSpeech.TextToSpeechClient();
let port = 5050;
server.listen(port, () => {
  console.log("Listening on port " + port);
});
io.on("connection", function (socket) {
  let fileName = "./mp3/" + randomString.generate(4) + ".mp3";
  socket.on("newText", (data) => {
    waitingTranslation();
    async function waitingTranslation() {
      let text = data.text;
      let target = data.lang;
      let [theTranslation] = await translate.translate(text, target);
      io.sockets.emit("translation", {
        user: data.user,
        text: text,
        translation: theTranslation,
        audioFile: fileName
      });
    }
    let request = {
      input: {
        text: data.text
      },
      voice: {
        languageCode: "en-US",
        ssmlGender: "NEUTRAL"
      },
      audioConfig: {
        audioEncoding: "MP3"
      }
    };
    textToSpeechClient.synthesizeSpeech(request, (err, res) => {
      if (err) {
        console.log("ERROR:", err);
        return;
      }
      fs.writeFile(fileName, res.audioContent, "binary", (err) => {
        if (err) {
          console.log("ERROR:", err);
          return;
        }
        console.log("Audio content written to file: " + fileName);
      });
    });
  });
});
