import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Constants } from './Roles';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { firstname, lastname, email, password } = createUserDto;
    const Role = Constants.Roles.USER_ROLE;
    const existingUser = await this.userRepo.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('user already exists');
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = this.userRepo.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role: Role,
    });
    return await this.userRepo.save(newUser);
  }

  async findAll() {
    return await this.userRepo.find();
  }
  async findUserByEmail(email: string) {
    return await this.userRepo.findOne({ where: { email: email } });
  }

  async findOne(id: number) {
    return await this.userRepo.findOneOrFail({ where: { id: id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return await this.userRepo.delete(id);
  }
}
