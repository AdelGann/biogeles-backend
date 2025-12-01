import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSpeciesDto {
    @ApiProperty({ example: 'Spirulina' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'A type of blue-green algae', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ example: 30 })
    @IsNotEmpty()
    cycleDays: number;

    @ApiProperty({ example: 0.5 })
    @IsNotEmpty()
    yieldPercent: number;

    @ApiProperty({ example: '20-30' })
    @IsString()
    @IsNotEmpty()
    tempRange: string;

    @ApiProperty({ example: '8-9' })
    @IsString()
    @IsNotEmpty()
    phRange: string;

    @ApiProperty({ example: 'Food' })
    @IsString()
    @IsNotEmpty()
    usage: string;
}
