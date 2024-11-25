import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findUser(createUserDto.login);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await hash(createUserDto.password, 10);
    return this.usersService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async validateUser(login: string, password: string) {
    const user = await this.usersService.findUser(login);
    if (user && (await compare(password, user.password))) {
      const payload = { userId: user.id, login: user.login };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new UnauthorizedException();
  }

  async refreshToken(token: string) {
    const payload = this.jwtService.verify(token);
    const newToken = this.jwtService.sign({
      userId: payload.userId,
      login: payload.login,
    });
    return { access_token: newToken };
  }
}
