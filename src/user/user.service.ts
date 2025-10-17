import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}


  async create(createUserDto: CreateUserDto, userRole?: string) {
    // Kiểm tra tồn tại email
    const existByEmail = await this.usersRepository.findOne({ 
      where: { email: createUserDto.email } 
    });
    if (existByEmail) {
      throw new Error('Email already exists');
    }

    // Kiểm tra tồn tại phone
    const existByPhone = await this.usersRepository.findOne({ 
      where: { phone: createUserDto.phone } 
    });
    if (existByPhone) {
      throw new Error('Phone number already exists');
    }

    // Kiểm tra tồn tại username
    const existByUsername = await this.usersRepository.findOne({ 
      where: { username: createUserDto.username } 
    });
    if (existByUsername) {
      throw new Error('Username already exists');
    }

    // Xử lý role: chỉ admin mới được phép set role tùy ý
    if (userRole !== 'admin') {
      // Nếu không phải admin, bắt buộc role là 'customer'
      createUserDto.role = 'customer';
    }
    // Nếu là admin thì giữ nguyên role được nhập vào từ createUserDto

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = hashedPassword;
    
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
    //return `This action returns all user`;
  }
  
  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
    //return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto, userRole?: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new Error('User not found');
    }

    // Không cho phép cập nhật username
    if (updateUserDto.username) {
      throw new Error('Username cannot be updated');
    }

    // Chỉ admin mới được phép cập nhật role
    if (updateUserDto.role && userRole !== 'admin') {
      throw new Error('Only admin can update user role');
    }

    // Hash password nếu có cập nhật
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(updateUserDto.password, salt);
      updateUserDto.password = hashedPassword;
    }

    await this.usersRepository.update(id, updateUserDto);
    return this.usersRepository.findOneBy({ id });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new Error('User not found');
    }
    await this.usersRepository.delete(id);
    return { message: `User #${id} has been successfully removed`, deletedUser: user };
  }
}
