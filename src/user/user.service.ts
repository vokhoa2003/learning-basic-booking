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


  async create(createUserDto: CreateUserDto) {
    const isExist = await this.usersRepository.findOneBy({ email: createUserDto.email });
    if (isExist) {
      throw new Error('Email already exists');
    }
    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = hashedPassword;
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
    //return 'This action adds a new user';
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
    //return `This action returns all user`;
  }
  
  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
    //return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(updateUserDto.password, salt);
      updateUserDto.password = hashedPassword;
    }
    return this.usersRepository.update(id, updateUserDto);
    //return `This action updates a #${id} user`;
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
