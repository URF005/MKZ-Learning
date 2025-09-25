// U:\LMS-MKZ\server\middleware\multer.js
import path from "path";
import multer from "multer";
import crypto from "crypto";

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (_req, file, cb) => {
        const uniqueName =
            Date.now() +
            "-" +
            crypto.randomBytes(6).toString("hex") +
            path.extname(file.originalname);
        cb(null, uniqueName);
    },
});

function fileFilter(_req, file, cb) {
    const allowedExts = [".jpg", ".jpeg", ".png", ".webp"];
    const ext = path.extname(file.originalname).toLowerCase();

    if (!allowedExts.includes(ext)) {
        return cb(new Error(`Unsupported file type! ${ext}`), false);
    }
    cb(null, true);
}

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
    fileFilter,
});

export default upload;
