import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: CreateUserDto) {
    return await this.authService.validateUser(
      loginDto.login,
      loginDto.password,
    );
  }

  @Post('refresh')
  async refresh(@Body('token') token: string) {
    return this.authService.refreshToken(token);
  }
}
