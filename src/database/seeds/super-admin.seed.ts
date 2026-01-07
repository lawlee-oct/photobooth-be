import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';

import { User, UserRole, UserStatus } from '../../entities/user.entity';

const SALT_ROUNDS = 10;

export async function seedSuperAdmin(dataSource: DataSource): Promise<void> {
  const userRepository = dataSource.getRepository(User);

  const superAdminUsername = process.env.SUPER_ADMIN_USERNAME || '';
  const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD || '';

  const existingSuperAdmin = await userRepository.findOne({
    where: { username: superAdminUsername },
  });

  if (existingSuperAdmin) {
    console.log('Super Admin already exists, skipping seed...');
    return;
  }

  const hashedPassword = await bcrypt.hash(superAdminPassword, SALT_ROUNDS);

  const superAdmin = userRepository.create({
    username: superAdminUsername,
    password: hashedPassword,
    fullName: 'Super Administrator',
    role: UserRole.SUPER_ADMIN,
    status: UserStatus.ACTIVE,
  });

  await userRepository.save(superAdmin);
  console.log('Super Admin created successfully!');
  console.log(`Username: ${superAdminUsername}`);
}
