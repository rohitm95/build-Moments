const multer = require("multer");
const multerS3 = require("multer-s3");
import { S3Client } from "@aws-sdk/client-s3";
const s3 = new S3Client({});

const upload = multer({
  storage: multerS3({
    acl: "public-read",
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      req.file = Date.now + file.originalname;
      cb(null, Date.now() + file.originalname);
    },
  }),
});

module.exports = upload;
