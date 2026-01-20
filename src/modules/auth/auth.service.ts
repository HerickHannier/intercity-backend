import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/prisma";
import { Prisma } from "@prisma/client";

export class AuthService {
    async register(data: any) {
        if (!data?.email || !data?.password || !data?.name) {
            throw new Error("Dados inválidos");
        }
        try {
            const hashed = await bcrypt.hash(data.password, 10);

            return await prisma.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: hashed,
                    phone: data.phone ?? "",
                    role: "PASSENGER",
                },
            });
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2002"
            ) {
                throw new Error("Este email já está cadastrado");
            }

            throw error;
        }
    }

    async login(email: string, password: string) {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            throw new Error("Email ou senha inválidos");
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new Error("Email ou senha inválidos");
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET!,
            { expiresIn: "1d" }
        );

        return { token };
    }
}
