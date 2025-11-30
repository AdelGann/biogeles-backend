import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('admin')
@ApiBearerAuth()
@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Get('stats')
    @ApiOperation({ summary: 'Get system stats' })
    getStats() {
        return this.adminService.getStats();
    }

    @Get('species')
    @ApiOperation({ summary: 'List all species' })
    findAllSpecies() {
        return this.adminService.findAllSpecies();
    }

    @Post('species')
    @ApiOperation({ summary: 'Create a species' })
    createSpecies(@Body() data: any) {
        return this.adminService.createSpecies(data);
    }

    @Get('formulas')
    @ApiOperation({ summary: 'List all formulas' })
    findAllFormulas() {
        return this.adminService.findAllFormulas();
    }

    @Post('formulas')
    @ApiOperation({ summary: 'Create a formula' })
    createFormula(@Body() data: any) {
        return this.adminService.createFormula(data);
    }

    @Get('config')
    @ApiOperation({ summary: 'Get system config' })
    getConfig() {
        return this.adminService.getConfig();
    }

    @Patch('config')
    @ApiOperation({ summary: 'Update system config' })
    updateConfig(@Body() data: any) {
        return this.adminService.updateConfig(data);
    }
}
