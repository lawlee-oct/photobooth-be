import { ApiProperty } from '@nestjs/swagger';

import { UserRole } from '../../../entities/user.entity';

export class AuthUserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty({ nullable: true })
  fullName: string | null;

  @ApiProperty({ enum: UserRole })
  role: UserRole;
}

export class AuthResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty({ type: AuthUserDto })
  user: AuthUserDto;
}
