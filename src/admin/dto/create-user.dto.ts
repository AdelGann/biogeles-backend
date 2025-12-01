export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
}
import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'user@example.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'John Doe' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'password123' })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ enum: Role, example: Role.USER })
    @IsEnum(Role)
    @IsNotEmpty()
    role: Role;
}
