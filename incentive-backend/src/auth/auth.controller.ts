import { Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { ApiBody, ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: () => LoginDto })
  @Post('auth/login')
  @HttpCode(200)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
