import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userService.findByUsername(username);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    
    // Tạo access token (ngắn hạn)
    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '5m', // 15 phút
    });

    // Tạo refresh token (dài hạn)
    const refresh_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d', // 7 ngày
    });

    // Lưu refresh token vào DB để quản lý
    await this.userService.update(user.id, { refresh_token });

    return {
      access_token,
      refresh_token,
    };
  }

  async logout(id: number): Promise<void> {
    await this.userService.update(id, { refresh_token: null });
  }
}
