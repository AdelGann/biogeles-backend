import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UpdateProfileDto } from './dto/update-profile.dto';

@ApiTags('profile')
@ApiBearerAuth()
@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }

    @Get()
    @ApiOperation({ summary: 'Get user profile' })
    getProfile() {
        return this.profileService.getProfile(1); // Mocked user ID
    }

    @Patch()
    @ApiOperation({ summary: 'Update user profile' })
    updateProfile(@Body() data: UpdateProfileDto) {
        return this.profileService.updateProfile(1, data); // Mocked user ID
    }
}
