import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { validate as isUUID } from 'uuid';
import { User } from './entities/user.entity';
import { LoginUserDto, CreateUserDto, UpdateUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';




@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) { }

  async getAllUsers() {
    try {
      const users = await this.userRepository.find();
      return users.map(user => (user));
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async create(createUserDto: CreateUserDto) {

    try {

      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });

      await this.userRepository.save(user)
      delete user.password;

      return {
        ...user,
        token: this.getJwtToken({ id: user.id })
      };


    } catch (error) {
      this.handleDBErrors(error);
    }

  }

  async update(id: string, updateUserDto: UpdateUserDto) {

    const { email, ...toUpdate } = updateUserDto


    const equipment = await this.userRepository.preload({ id, ...toUpdate })
    if (!equipment) throw new NotFoundException(`Product with id: ${id} not found`);

    console.log(equipment)
    try {
      await this.userRepository.save(equipment);
      return equipment;
    } catch (error) {
      this.handleDBErrors(error);
    }

  }
  async findOne(id: string) {


    const user = await this.userRepository.findOneBy({ id });


    if (!user)
      throw new NotFoundException(`User with ${id} not found`);

    return user;
  }



  async delete(id: string) {
    const equipment = await this.findOne(id);
    await this.userRepository.remove(equipment);
    return equipment;
  }



  async login(loginUserDto: LoginUserDto) {

    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true, roles: true, fullName: true }
    });

    if (!user)
      throw new UnauthorizedException('Credenciales no validas (email)');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credenciales no validas (password)');

    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    };
  }

  async checkAuthStatus(user: User) {

    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    };

  }



  private getJwtToken(payload: JwtPayload) {

    const token = this.jwtService.sign(payload);
    return token;

  }

  private handleDBErrors(error: any): never {


    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    console.log(error)

    throw new InternalServerErrorException('Please check server logs');

  }


}