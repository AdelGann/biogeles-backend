import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ProfileService {
    constructor(private prisma: PrismaService) { }

    async getProfile(userId: number) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (user) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async updateProfile(userId: number, data: Prisma.UserUpdateInput) {
        if (data.password) {
            data.password = await bcrypt.hash(data.password as string, 10);
        }
        const user = await this.prisma.user.update({
            where: { id: userId },
            data,
        });
        const { password, ...result } = user;
        return result;
    }
}
