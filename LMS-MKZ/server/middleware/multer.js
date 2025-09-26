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
    const allowedImageExts = [".jpg", ".jpeg", ".png", ".webp"];
    const allowedVideoExts = [".mp4", ".mov", ".avi", ".mkv", ".webm"];
    const ext = path.extname(file.originalname).toLowerCase();

    if (![...allowedImageExts, ...allowedVideoExts].includes(ext)) {
        return cb(new Error(`Unsupported file type! ${ext}`), false);
    }
    cb(null, true);
}

const upload = multer({
    storage,
    limits: { fileSize: 200 * 1024 * 1024 }, // allow larger files for video (200MB)
    fileFilter,
});

export default upload;
