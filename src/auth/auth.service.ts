import { BadRequestException, HttpException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { validate as isUUID } from 'uuid';
import { User } from './entities/user.entity';
import { LoginUserDto, CreateUserDto, UpdateUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { PaginationDto } from 'src/common/dtos/pagination.dto';




@Injectable()
export class AuthService {

  private readonly logger = new Logger('AuthService')

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) { }

  async findAll(paginationDto: PaginationDto) {

    const { limit = 10, offset = 0 } = paginationDto;

    try {

      const employees = await this.userRepository.find({
        take: limit,
        skip: offset,
        order: {
          fullName: 'ASC'
        }
      });

      const totalUsers = await this.userRepository.count();
      const totalPages = Math.ceil(totalUsers / limit);
      const currentPage = Math.floor(offset / limit) + 1;

      const response = {
        limit,
        offset,
        totalUsers,
        totalPages,
        currentPage,
        employees

      };

      return response;

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
        // token: this.getJwtToken({ id: user.id })
      };


    } catch (error) {
      this.handleDBErrors(error);
    }

  }

  async update(id: string, updateUserDto: UpdateUserDto) {

    const { email, password, ...toUpdate } = updateUserDto


    const user = await this.userRepository.preload({ id, ...toUpdate })
    if (!user) throw new NotFoundException(`Usuario con el: ${id} no encontrado`);

    if (password) {
      user.password = bcrypt.hashSync(password, 10);
    }

    try {
      await this.userRepository.save(user);
      return user;
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
    try {
      const user = await this.findOne(id);
      await this.userRepository.update(id, { isActive: false });
      return user;
    } catch (error) {
      this.handleDBErrors(error);
    }

  }


  async login(loginUserDto: LoginUserDto) {

    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true, roles: true, fullName: true, isActive: true }
    });

    if (!user)
      throw new UnauthorizedException('Credenciales no validas (email)');

    if (!user.isActive )
      throw new UnauthorizedException('Usuario inactivo, no puede iniciar sesión');

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


    if (error.code === '23505' || error.code === '23503')
      throw new BadRequestException(error.detail);

    this.logger.error(error)

    throw new InternalServerErrorException(error);
  }

}