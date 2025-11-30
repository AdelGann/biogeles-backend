import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';

@ApiTags('orders')
@ApiBearerAuth()
@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Get()
    @ApiOperation({ summary: 'List all orders' })
    findAll() {
        return this.ordersService.findAll();
    }

    @Post()
    @ApiOperation({ summary: 'Create a new order' })
    create(@Body() data: CreateOrderDto) {
        return this.ordersService.create(data);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update an order' })
    update(@Param('id') id: string, @Body() data: UpdateOrderDto) {
        return this.ordersService.update(+id, data);
    }

    @Patch(':id/status')
    @ApiOperation({ summary: 'Update order status' })
    updateStatus(@Param('id') id: string, @Body('status') status: string) {
        return this.ordersService.updateStatus(+id, status);
    }

    @Get('stats')
    @ApiOperation({ summary: 'Get order statistics' })
    getStats() {
        return this.ordersService.getStats();
    }
}
