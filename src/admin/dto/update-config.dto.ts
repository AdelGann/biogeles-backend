import { IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateConfigDto {
    @ApiProperty({ example: false, required: false })
    @IsBoolean()
    @IsOptional()
    maintenanceMode?: boolean;

    @ApiProperty({ example: true, required: false })
    @IsBoolean()
    @IsOptional()
    autoBackup?: boolean;

    @ApiProperty({ example: true, required: false })
    @IsBoolean()
    @IsOptional()
    emailNotifs?: boolean;

    @ApiProperty({ example: false, required: false })
    @IsBoolean()
    @IsOptional()
    extendedHistory?: boolean;
}
