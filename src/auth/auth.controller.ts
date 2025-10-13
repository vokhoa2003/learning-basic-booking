import { Controller, Post, Body, UnauthorizedException, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');
    }
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard) // bảo vệ route bằng JWT
  @Post('logout')
  async logout(@Req() req) {
    const id = req.user?.id; // lấy userId từ JWT payload
    await this.authService.logout(id);
    return { message: 'Đăng xuất thành công!' };
    }
}
