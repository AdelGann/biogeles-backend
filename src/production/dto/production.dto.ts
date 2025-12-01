import { ApiProperty } from '@nestjs/swagger';

export class CreateProductionEventDto {
  @ApiProperty({ example: 'Seeding Batch 1' })
  title: string;

  @ApiProperty({ example: 'Initial seeding for tank A', required: false })
  description?: string;

  @ApiProperty({ example: '2025-01-01T08:00:00Z' })
  startDate: Date;

  @ApiProperty({ example: '2025-01-01T12:00:00Z' })
  endDate: Date;

  @ApiProperty({ example: 'SEEDING' })
  type: string;

  @ApiProperty({ example: 'NONE', required: false })
  alertLevel?: string;
}

export class UpdateProductionEventDto {
  @ApiProperty({ example: 'Seeding Batch 1', required: false })
  title?: string;

  @ApiProperty({ example: 'Initial seeding for tank A', required: false })
  description?: string;

  @ApiProperty({ example: '2025-01-01T08:00:00Z', required: false })
  startDate?: Date;

  @ApiProperty({ example: '2025-01-01T12:00:00Z', required: false })
  endDate?: Date;

  @ApiProperty({ example: 'SEEDING', required: false })
  type?: string;

  @ApiProperty({ example: 'SCHEDULED', required: false })
  status?: string;

  @ApiProperty({ example: 'NONE', required: false })
  alertLevel?: string;
}
