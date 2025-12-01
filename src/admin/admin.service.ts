import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const speciesCount = await this.prisma.species.count();
    const formulasCount = await this.prisma.formula.count();
    const usersCount = await this.prisma.user.count();
    return { speciesCount, formulasCount, usersCount };
  }

  async findAllSpecies() {
    return this.prisma.species.findMany();
  }

  async createSpecies(data: Prisma.SpeciesCreateInput) {
    return this.prisma.species.create({ data });
  }

  async findAllFormulas() {
    return this.prisma.formula.findMany();
  }

  async createFormula(data: Prisma.FormulaCreateInput) {
    return this.prisma.formula.create({ data });
  }

  async getConfig() {
    return this.prisma.systemConfig.findFirst();
  }

  async updateConfig(data: Prisma.SystemConfigUpdateInput) {
    const config = await this.prisma.systemConfig.findFirst();
    if (config) {
      return this.prisma.systemConfig.update({
        where: { id: config.id },
        data,
      });
    } else {
      return this.prisma.systemConfig.create({
        data: {
          maintenanceMode: data.maintenanceMode as boolean,
          autoBackup: data.autoBackup as boolean,
          emailNotifs: data.emailNotifs as boolean,
          extendedHistory: data.extendedHistory as boolean,
        },
      });
    }
  }
}
