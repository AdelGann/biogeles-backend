import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateProductionEventDto,
  UpdateProductionEventDto,
} from './dto/production.dto';

@Injectable()
export class ProductionService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.productionEvent.findMany();
  }

  async create(data: CreateProductionEventDto) {
    return this.prisma.productionEvent.create({ data });
  }

  async update(id: number, data: UpdateProductionEventDto) {
    return this.prisma.productionEvent.update({
      where: { id },
      data,
    });
  }

  async getStats() {
    // Mocked stats based on UI
    const totalProduction = 1240; // kg
    const maintenanceAlerts = await this.prisma.productionEvent.count({
      where: {
        type: 'MAINTENANCE',
        endDate: { gte: new Date() }, // Active maintenance
      },
    });
    return { totalProduction, maintenanceAlerts };
  }

  async delete(id: number) {
    return this.prisma.productionEvent.delete({
      where: {
        id,
      },
    });
  }
}
