import path from "path";
import fs from "fs";
import express from "express";
import multer from "multer";

const router = express.Router();
const uploadDir = path.join(path.resolve(), "uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const allowed = /jpeg|jpg|png/;
  const extname = allowed.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowed.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error("Please choose a JPG or PNG image"));
}

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => checkFileType(file, cb),
});

router.post("/", (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      res.status(400);
      return next(err);
    }
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }
    res.json({
      message: "File uploaded successfully",
      file: `/uploads/${req.file.filename}`,
    });
  });
});

export default router;
