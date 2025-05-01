
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // You can specify a folder to temporarily store images
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname) // Save file with a timestamp
    );
  },
});

const upload = multer({ storage });

module.exports = upload;
