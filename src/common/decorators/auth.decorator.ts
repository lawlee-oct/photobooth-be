import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { UserRole } from '../../entities/user.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { ROLES_KEY } from './roles.decorator';

export const REQUIRE_AUTH_KEY = 'requireAuth';

/**
 * Decorator to require authentication
 * Usage: @Auth() or @Auth(UserRole.ADMIN)
 */
export const Auth = (...roles: UserRole[]) => {
  const decorators = [
    SetMetadata(REQUIRE_AUTH_KEY, true),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(),
  ];

  if (roles.length > 0) {
    decorators.push(SetMetadata(ROLES_KEY, roles));
  }

  return applyDecorators(...decorators);
};
