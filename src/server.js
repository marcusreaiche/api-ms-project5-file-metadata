'use strict';

var express = require('express');
var cors = require('cors');
const path = require("path");
const multer = require("multer");

// Instantiating the app
var app = express();

// Setting multer
const storage = multer.memoryStorage();
const upload = multer({storage});

// Golbal middlewares
app.use(cors());
app.use(path.join(__dirname, "..", "public"), express.static(path.join(__dirname, "..", "public")));

console.log(path.join(__dirname, "..", "public"));
// Routes
app.get('/', function (req, res) {
     res.sendFile(path.resolve(__dirname, "..", "views", "index.html"));
});

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  const {originalname: name, mimetype: type, size} = req.file;
  return res.json({
    name,
    type,
    size
  });
});


app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
