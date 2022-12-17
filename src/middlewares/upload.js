const multer = require("multer");
const { response } = require("./common");
const { resp } = require("./common");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    const uniq = Date.now() + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniq + ".png");
  },
});

const upload = multer({
  limits: { fileSize: 10 * 1024 ** 2 },
  storage: storage,
  fileFilter: (res, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "video/mp4" ||
      file.mimetype === "video/mkv"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Input file with png, jpg, mp4, mkv format"));
    }
  },
});

module.exports = upload;
