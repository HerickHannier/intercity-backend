import { Request, Response } from "express";
import { prisma } from "../../config/prisma";

export class UsersController {
    async me(req: Request, res: Response) {
        const userId = req.userId;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                cpf: true,
                city: true,
                photoUrl: true,
                createdAt: true,
            },
        });

        return res.json(user);
    }

    async update(req: Request, res: Response) {
        const userId = req.userId;
        const { name, phone, cpf, city, photoUrl } = req.body;

        const data: any = {};

        if (name !== undefined) data.name = name;
        if (phone !== undefined) data.phone = phone;
        if (cpf !== undefined) data.cpf = cpf;
        if (city !== undefined) data.city = city;
        if (photoUrl !== undefined) data.photoUrl = photoUrl;

        const user = await prisma.user.update({
            where: { id: userId },
            data,
        });

        return res.json(user);
    }

    async uploadAvatar(req: Request, res: Response) {
        const userId = req.userId;

        if (!req.file) {
            return res.status(400).json({ error: "Arquivo não enviado" });
        }

        const photoUrl = `/uploads/${req.file.filename}`;

        const user = await prisma.user.update({
            where: { id: userId },
            data: { photoUrl },
        });

        return res.json(user);
    }
}
