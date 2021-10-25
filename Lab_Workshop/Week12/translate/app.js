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
  socket.on("newText", (data1,data2) => {
    waitingTranslation1();
    async function waitingTranslation1() {
      let text = data1.text;
      let target = data1.lang;
      let [theTranslation] = await translate.translate(text, target);
      io.sockets.emit("translation", {
        user: data1.user,
        text: text,
        translation: theTranslation,
        audioFile: fileName
      });
    }
    waitingTranslation2();
    async function waitingTranslation2() {
      let text = data2.text;
      let target = data2.lang;
      let [theTranslation] = await translate.translate(text, target);
      io.sockets.emit("translation", {
        user: data2.user,
        text: text,
        translation: theTranslation,
        audioFile: fileName
      });
    }
    let request2 = {
      input: {
        text: data2.text
      },
      voice: {
        languageCode: "en-US",
        ssmlGender: "NEUTRAL"
      },
      audioConfig: {
        audioEncoding: "MP3"
      }
    };
    textToSpeechClient.synthesizeSpeech(request2, (err, res) => {
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
    })
    let request1 = {
      input: {
        text: data1.text
      },
      voice: {
        languageCode: "en-US",
        ssmlGender: "NEUTRAL"
      },
      audioConfig: {
        audioEncoding: "MP3"
      }
    };
    textToSpeechClient.synthesizeSpeech(request1, (err, res) => {
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
    })
  });
});
