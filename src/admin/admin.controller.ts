import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { CreateFormulaDto } from './dto/create-formula.dto';
import { UpdateConfigDto } from './dto/update-config.dto';

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

    @Get('users')
    @ApiOperation({ summary: 'List all users' })
    findAllUsers() {
        return this.adminService.findAllUsers();
    }

    @Post('users')
    @ApiOperation({ summary: 'Create a user' })
    createUser(@Body() data: CreateUserDto) {
        return this.adminService.createUser(data);
    }

    @Delete('users/:id')
    @ApiOperation({ summary: 'Delete a user' })
    deleteUser(@Param('id') id: string) {
        return this.adminService.deleteUser(+id);
    }

    @Get('species')
    @ApiOperation({ summary: 'List all species' })
    findAllSpecies() {
        return this.adminService.findAllSpecies();
    }

    @Post('species')
    @ApiOperation({ summary: 'Create a species' })
    createSpecies(@Body() data: CreateSpeciesDto) {
        return this.adminService.createSpecies(data);
    }

    @Delete('species/:id')
    @ApiOperation({ summary: 'Delete a species' })
    deleteSpecies(@Param('id') id: string) {
        return this.adminService.deleteSpecies(+id);
    }

    @Get('formulas')
    @ApiOperation({ summary: 'List all formulas' })
    findAllFormulas() {
        return this.adminService.findAllFormulas();
    }

    @Post('formulas')
    @ApiOperation({ summary: 'Create a formula' })
    createFormula(@Body() data: CreateFormulaDto) {
        return this.adminService.createFormula(data);
    }

    @Delete('formulas/:id')
    @ApiOperation({ summary: 'Delete a formula' })
    deleteFormula(@Param('id') id: string) {
        return this.adminService.deleteFormula(+id);
    }

    @Get('config')
    @ApiOperation({ summary: 'Get system config' })
    getConfig() {
        return this.adminService.getConfig();
    }

    @Patch('config')
    @ApiOperation({ summary: 'Update system config' })
    updateConfig(@Body() data: UpdateConfigDto) {
        return this.adminService.updateConfig(data);
    }
}
