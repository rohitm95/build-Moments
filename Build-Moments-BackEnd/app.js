const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
var fs = require("fs");
var morgan = require("morgan");
const aws = require("aws-sdk"),
  { S3 } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");

const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");

const MONGODB_URI =
  "mongodb+srv://rohitm95:jbMS2zI5m6umJ8Vr@cluster0.zow71as.mongodb.net/moments";

const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream }));

app.use(cors());

const { v4: uuidv4 } = require("uuid");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4());
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("file")
);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRoutes);
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  // console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

const config = {
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY | "AKIA5ANNYP7DZ4HP6T6C",
    secretAccessKey:
      process.env.AWS_SECRET_ACCESS_KEY |
      "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",
  },
};

const s3 = new S3(config);

app.get("/generatepresignedurl", function (req, res) {
  var fileurls = [];

  const params = {
    Bucket: "mymomentsbucket",
    Key: req.query.fileName,
    Expires: 40 * 60, // Time until presigned URL is valid
    ACL: "public-read",
    ContentType: req.query.fileType,
  };

  s3.getSignedUrl("putObject", params, function async(err, url) {
    if (err) {
      res.json({
        success: false,
        message: "Pre- Signed URL error",
        urls: fileurls,
      });
    } else {
      fileurls[0] = url;
      res.json({
        success: true,
        message: "AWS SDK S3 Pre- signed urls generated successfully",
        urls: fileurls,
      });
    }
  });
});

const PORT = process.env.PORT || 3000;
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(PORT, () => {
      console.warn(`App listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    // console.log(err);
  });
