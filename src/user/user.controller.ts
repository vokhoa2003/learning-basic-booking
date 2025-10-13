import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ForbiddenException} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Roles } from 'src/authorization/roles.decorator';
import { RolesGuard } from 'src/authorization/roles.guard';

@Controller('user')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  
  @Get()
  @Roles('admin')
  findAll() : Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
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
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
