import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrdersService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.order.findMany();
    }

    async create(data: any) {
        return this.prisma.order.create({ data });
    }

    async updateStatus(id: number, status: string) {
        return this.prisma.order.update({
            where: { id },
            data: { status },
        });
    }

    async update(id: number, data: any) {
        return this.prisma.order.update({
            where: { id },
            data,
        });
    }

    async getStats() {
        const totalOrders = await this.prisma.order.count();
        const activeOrders = await this.prisma.order.count({
            where: {
                status: {
                    not: 'COMPLETED',
                },
            },
        });
        return { totalOrders, activeOrders };
    }
}
