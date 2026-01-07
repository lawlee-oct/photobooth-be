import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Auth } from '../../common/decorators';
import { User, UserRole } from '../../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ============ SUPER_ADMIN APIs ============

  @Auth(UserRole.SUPER_ADMIN)
  @Post('admins')
  @ApiOperation({ summary: 'Create admin account (Super Admin only)' })
  @ApiResponse({ status: 201, description: 'Admin created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Super Admin only' })
  @ApiResponse({ status: 409, description: 'Username already exists' })
  createAdmin(@Body() body: CreateUserDto): Promise<Omit<User, 'password'>> {
    return this.usersService.createAdmin(body);
  }

  @Auth(UserRole.SUPER_ADMIN)
  @Get('admins')
  @ApiOperation({ summary: 'Get all admin accounts (Super Admin only)' })
  @ApiResponse({ status: 200, description: 'List of admins' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Super Admin only' })
  findAllAdmins(): Promise<User[]> {
    return this.usersService.findByRole(UserRole.ADMIN);
  }

  // ============ ADMIN APIs ============

  @Auth(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Create user account (Admin or Super Admin)' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Admin or Super Admin only',
  })
  @ApiResponse({ status: 409, description: 'Username already exists' })
  createUser(@Body() body: CreateUserDto): Promise<Omit<User, 'password'>> {
    return this.usersService.createUser(body);
  }

  @Auth(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @Get()
  @ApiOperation({ summary: 'Get all users (Admin or Super Admin)' })
  @ApiResponse({ status: 200, description: 'List of users' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Admin or Super Admin only',
  })
  findAllUsers(): Promise<User[]> {
    return this.usersService.findByRole(UserRole.USER);
  }
}
