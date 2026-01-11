import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { User, UserRole } from '../../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private readonly SALT_ROUNDS = 10;

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(payload: CreateUserDto): Promise<Omit<User, 'password'>> {
    const existingUser = await this.findByUsername(payload.username);

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(
      payload.password,
      this.SALT_ROUNDS,
    );

    const user = this.usersRepository.create({
      ...payload,
      password: hashedPassword,
      role: UserRole.USER,
    });

    const savedUser = await this.usersRepository.save(user);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }

  async createAdmin(payload: CreateUserDto): Promise<Omit<User, 'password'>> {
    const existingUser = await this.findByUsername(payload.username);

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(
      payload.password,
      this.SALT_ROUNDS,
    );

    const admin = this.usersRepository.create({
      ...payload,
      password: hashedPassword,
      role: UserRole.ADMIN,
    });

    const savedAdmin = await this.usersRepository.save(admin);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...adminWithoutPassword } = savedAdmin;
    return adminWithoutPassword;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: [
        'id',
        'username',
        'fullName',
        'role',
        'status',
        'createdAt',
        'updatedAt',
      ],
    });
  }

  findById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }

  findByRole(role: UserRole): Promise<User[]> {
    return this.usersRepository.find({
      where: { role },
      select: [
        'id',
        'username',
        'fullName',
        'role',
        'status',
        'createdAt',
        'updatedAt',
      ],
    });
  }
}
