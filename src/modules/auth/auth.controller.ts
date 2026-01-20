import { Request, Response } from "express";
import { prisma } from "../../config/prisma";
import { AuthService } from "./auth.service";

export class AuthController {
    private service = new AuthService();

    // ✅ USAR ARROW FUNCTION
    register = async (req: Request, res: Response) => {
        try {
            const user = await this.service.register(req.body);
            return res.status(201).json(user);
        } catch (error: any) {
            return res.status(400).json({
                message: error.message || 'Erro ao criar usuário',
            });
        }
    };

    // já estava certo
    login = async (req: Request, res: Response) => {
        const result = await this.service.login(
            req.body.email,
            req.body.password
        );
        return res.json(result);
    };

    async me(req: Request, res: Response) {
        const userId = req.userId; // ✅ CERTO

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true,
                createdAt: true,
            },
        });

        return res.json(user);
    }

}
