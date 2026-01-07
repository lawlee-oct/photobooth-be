import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Auth, CurrentUser } from '../../common/decorators';
import { User, UserRole } from '../../entities/user.entity';
import { AuthService } from './auth.service';
import { AuthResponseDto, LoginDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }

  @Post('admin/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Admin login' })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials or not admin' })
  async loginAdmin(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.loginAdmin(loginDto);
  }

  @Auth()
  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getProfile(@CurrentUser() user: User) {
    return this.authService.getProfile(user);
  }

  @Auth(UserRole.ADMIN)
  @Get('admin/profile')
  @ApiOperation({ summary: 'Get admin profile (admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Admin profile retrieved successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access only' })
  getAdminProfile(@CurrentUser() user: User) {
    return this.authService.getProfile(user);
  }
}
