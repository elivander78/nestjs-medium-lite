import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../common/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from '../users/dto/user.dto';

@Controller('auth')
@ApiTags('auths')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() userDto: UserDto): Promise<{ accessToken: string }> {
    const user = await this.authService.validateUser(
      userDto.email,
      userDto.password,
    );
    if (!user) {
      // Вы можете вернуть соответствующую ошибку
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }
  @Post('register')
  async register(@Body() userDto: UserDto): Promise<{ accessToken: string }> {
    const user = await this.authService.register(userDto);
    return this.authService.login(user);
  }
}
