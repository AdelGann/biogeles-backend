import { Controller, Get, UseGuards, Res } from '@nestjs/common';
import * as Express from 'express';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('reports')
@ApiBearerAuth()
@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) { }

    @Get('production-by-species')
    @ApiOperation({ summary: 'Get production by species chart data' })
    getProductionBySpecies() {
        return this.reportsService.getProductionBySpecies();
    }

    @Get('yield-vs-goal')
    @ApiOperation({ summary: 'Get yield vs goal chart data' })
    getYieldVsGoal() {
        return this.reportsService.getYieldVsGoal();
    }

    @Get('metrics')
    @ApiOperation({ summary: 'Get report metrics' })
    getMetrics() {
        return this.reportsService.getMetrics();
    }

    @Get('export')
    @ApiOperation({ summary: 'Export report to Excel' })
    async exportReport(@Res() res: Express.Response) {
        const buffer = await this.reportsService.generateExcel();
        res.set({
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': 'attachment; filename=reporte.xlsx',
            'Content-Length': (buffer as any).length,
        });
        res.end(buffer);
    }
}
