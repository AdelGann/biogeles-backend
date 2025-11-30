import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { ProductionService } from './production.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateProductionEventDto, UpdateProductionEventDto } from './dto/production.dto';

@ApiTags('production')
@ApiBearerAuth()
@Controller('production')
@UseGuards(JwtAuthGuard)
export class ProductionController {
    constructor(private readonly productionService: ProductionService) { }

    @Get('events')
    @ApiOperation({ summary: 'List production events' })
    findAll() {
        return this.productionService.findAll();
    }

    @Post('events')
    @ApiOperation({ summary: 'Create a production event' })
    create(@Body() data: CreateProductionEventDto) {
        return this.productionService.create(data);
    }

    @Patch('events/:id')
    @ApiOperation({ summary: 'Update a production event' })
    update(@Param('id') id: string, @Body() data: UpdateProductionEventDto) {
        return this.productionService.update(+id, data);
    }

    @Get('stats')
    getStats() {
        return this.productionService.getStats();
    }
}
