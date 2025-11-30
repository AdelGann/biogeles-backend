import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ReportsService {
    constructor(private prisma: PrismaService) { }

    async getProductionBySpecies() {
        // Mock data based on UI pie chart
        return [
            { species: 'Spirulina', percentage: 42, value: 4200 },
            { species: 'Wakame', percentage: 20, value: 2000 },
            { species: 'Nori', percentage: 21, value: 2100 },
            { species: 'Chlorella', percentage: 17, value: 1700 },
        ];
    }

    async getYieldVsGoal() {
        // Mock data based on UI line chart
        return {
            months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
            goal: [100, 100, 100, 100, 100, 100],
            real: [90, 95, 104, 102, 98, 105],
        };
    }

    async getMetrics() {
        // Mock data based on UI cards
        return {
            totalProduction: '10K kg',
            efficiency: '96.0%',
            quality: '98.2%',
            compliance: '100%',
        };
    }

    async generateExcel() {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Reporte Producción');

        worksheet.columns = [
            { header: 'Especie', key: 'species', width: 20 },
            { header: 'Producción (kg)', key: 'value', width: 15 },
            { header: 'Porcentaje', key: 'percentage', width: 15 },
        ];

        const productionData = await this.getProductionBySpecies();
        productionData.forEach((item) => {
            worksheet.addRow(item);
        });

        return await workbook.xlsx.writeBuffer();
    }
}
