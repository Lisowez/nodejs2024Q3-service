import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate, v4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from '../entities/user.entity'; // Импортируем сущность User

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) // Инжектируем репозиторий User
    private userRepository: Repository<User>,
  ) {}

  // Получаем всех пользователей (без паролей)
  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.userRepository.find();
    return users.map(({ password, ...rest }) => rest);
  }

  // Находим пользователя по ID (без пароля)
  async findUser(id: string): Promise<Omit<User, 'password'>> {
    if (!validate(id)) {
      throw new BadRequestException(`User with id ${id} is not valid.`);
    }

    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }

    const { password, ...rest } = user;
    return rest;
  }

  // Создаем нового пользователя
  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password'>> {
    const newUser = this.userRepository.create({
      id: v4(),
      login: createUserDto.login,
      password: createUserDto.password, // Необходимо хешировать пароль перед сохранением
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await this.userRepository.save(newUser);

    const { password, ...rest } = newUser;
    return rest;
  }

  // Меняем пароль пользователя
  async changePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.findUser(id);
    if (!validate(id)) {
      throw new BadRequestException(`User with id ${id} is not valid.`);
    }

    const existingUser = await this.userRepository.findOne({ where: { id } });
    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }

    if (existingUser.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }

    existingUser.password = updatePasswordDto.newPassword; // Необходимо хешировать новый пароль
    existingUser.version += 1;
    existingUser.updatedAt = new Date();

    await this.userRepository.save(existingUser);

    const { password, ...rest } = existingUser;
    return rest;
  }

  // Удаляем пользователя
  async deleteUser(id: string): Promise<void> {
    await this.findUser(id); // Проверка существования пользователя
    await this.userRepository.delete(id); // Удаление пользователя
  }
}
