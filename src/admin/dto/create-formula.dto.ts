import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFormulaDto {
    @ApiProperty({ example: 'Growth Formula A' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'Standard growth formula', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ example: 'Nitrogen, Phosphorus' })
    @IsString()
    @IsNotEmpty()
    nutrients: string;

    @ApiProperty({ example: '10ml/L' })
    @IsString()
    @IsNotEmpty()
    dose: string;

    @ApiProperty({ example: 'Daily' })
    @IsString()
    @IsNotEmpty()
    frequency: string;
}
