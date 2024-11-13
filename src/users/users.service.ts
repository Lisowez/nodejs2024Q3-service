import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUser, usersData } from '../dataBase/users.data';
import { validate, v4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  private users = usersData;

  findAll(): Omit<IUser, 'password'>[] {
    return this.users.map(({ password, ...rest }) => rest);
  }

  findUser(id: string): Omit<IUser, 'password'> {
    const user = this.users.find((user) => user.id === id);
    if (!validate(id)) {
      throw new BadRequestException(`User with id ${id} is not valid.`);
    }
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }

    const { password, ...rest } = user;

    return rest;
  }

  createUser(createUserDto: CreateUserDto): Omit<IUser, 'password'> {
    const newUser = {
      id: v4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
    const { password, ...rest } = newUser;
    return rest;
  }

  changePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = this.users.find((user) => user.id === id);
    if (!validate(id)) {
      throw new BadRequestException(`User with id ${id} is not valid.`);
    }
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }
    user.password = updatePasswordDto.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();
    const { password, ...rest } = user;

    return rest;
  }

  deleteUser(id: string) {
    const user = this.findUser(id);
    this.users = this.users.filter((user) => user.id !== id);
  }
}
