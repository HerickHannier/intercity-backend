// src/shared/middlewares/upload.middleware.ts
import multer from "multer";
import path from "path";

export const upload = multer({
    storage: multer.diskStorage({
        destination: "uploads/",
        filename: (_, file, cb) => {
            const ext = path.extname(file.originalname);
            cb(null, `${Date.now()}${ext}`);
        },
    }),
});
