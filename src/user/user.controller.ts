import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ForbiddenException} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Roles } from 'src/authorization/roles.decorator';
import { RolesGuard } from 'src/authorization/roles.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Req() req?) {
    // Lấy role từ JWT token nếu có (user đã đăng nhập)
    const userRole = req?.user?.role;
    return this.userService.create(createUserDto, userRole);
  }

  
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  findAll() : Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin','customer')
  findOne(@Param('id') id: string, @Req() req) {
    const userID = req.user.id;
    const role = req.user.role;
    if ( role === 'admin' ){
      return this.userService.findOne(+id);
    }
    if ( role === 'customer' && userID === Number(id)){
      return this.userService.findOne(+userID);
    }

    throw new ForbiddenException('Have not right to access');
  }



  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'customer')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Req() req) {
    this.validateUserAccess(+id, req.user);
    const userRole = req.user.role;
    return this.userService.update(+id, updateUserDto, userRole);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'customer')
  remove(@Param('id') id: string, @Req() req) {
    this.validateUserAccess(+id, req.user);
    return this.userService.remove(+id);
  }

  /**
   * Helper method: Kiểm tra quyền truy cập user
   * - Admin: có quyền với mọi user
   * - Customer: chỉ có quyền với tài khoản của mình
   */
  private validateUserAccess(targetUserId: number, currentUser: any): void {
    const { id: currentUserId, role } = currentUser;

    if (role === 'admin') {
      // Admin có quyền với mọi user
      return;
    }

    if (role === 'customer') {
      // Customer chỉ có quyền với tài khoản của mình
      if (currentUserId !== targetUserId) {
        throw new ForbiddenException('You do not have permission to access this user');
      }
      return;
    }

    // Nếu role không hợp lệ
    throw new ForbiddenException('Invalid role or insufficient permissions');
  }
}
