import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
    @ApiProperty({ example: 'Client A' })
    clientName: string;

    @ApiProperty({ example: 'Spirulina' })
    product: string;

    @ApiProperty({ example: 100 })
    quantity: number;

    @ApiProperty({ example: '2025-12-31T00:00:00Z' })
    deliveryDate: Date;
}

export class UpdateOrderDto {
    @ApiProperty({ example: 'Client A', required: false })
    clientName?: string;

    @ApiProperty({ example: 'Spirulina', required: false })
    product?: string;

    @ApiProperty({ example: 100, required: false })
    quantity?: number;

    @ApiProperty({ example: 'PENDING', required: false })
    status?: string;

    @ApiProperty({ example: 'NORMAL', required: false })
    priority?: string;

    @ApiProperty({ example: '2025-12-31T00:00:00Z', required: false })
    deliveryDate?: Date;
}
