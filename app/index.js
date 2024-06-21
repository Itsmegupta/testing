const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(express.static("./public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var filepath = './uploads'; // Your upload directory path
    if (!fs.existsSync(filepath)) {
      fs.mkdirSync(filepath, { recursive: true });
      cb(null, filepath);
    } else {
      cb(null, filepath);
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Keep original filename
  }
});

const upload = multer({ storage: storage });

app.post('/uploadImage', upload.single('image'), (req, res) => {
  console.log('File uploaded successfully:', req.file);
  res.json('success');
});

app.listen(PORT, () => {
  console.log("Server is listening on", PORT);
});
