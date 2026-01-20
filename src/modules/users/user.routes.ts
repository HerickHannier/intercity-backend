import { Router } from "express";
import multer from "multer";
import path from "path";
import { UsersController } from "./user.controller";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";

const router = Router();
const controller = new UsersController();

/**
 * Configuração do upload
 */
const upload = multer({
    dest: path.resolve(__dirname, "..", "..", "..", "uploads"),
});

/**
 * Retorna usuário autenticado
 */
router.get(
    "/me",
    authMiddleware,
    (req, res) => controller.me(req, res)
);

/**
 * Atualiza perfil do usuário
 */
router.put(
    "/me",
    authMiddleware,
    (req, res) => controller.update(req, res)
);

/**
 * Upload de avatar
 */
router.put(
    "/avatar",
    authMiddleware,
    upload.single("avatar"),
    (req, res) => controller.uploadAvatar(req, res)
);

export default router;
