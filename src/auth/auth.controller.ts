import { Controller, Get, Post, Body, UseGuards, Patch, Param, ParseUUIDPipe, Delete, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetUser, Auth } from './decorators';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { User } from './entities/user.entity';
import { ValidRoles } from './interfaces';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post('register')
  @Auth()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Get('get')
  @Auth()
  async getAllUsers(
    @Query() paginationDto: PaginationDto
  ) {
    return await this.authService.findAll(paginationDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Patch(':id')
  @Auth()
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto) {
    return this.authService.update(id, updateUserDto)
  }

  @Delete(':id')
  @Auth()
  delete(
    @Param('id', ParseUUIDPipe) id: string,

  ) {
    return this.authService.delete(id)
  }


  @Get('check')
  @Auth()
  checkAuthStatus(
    @GetUser() user: User
  ) {
    return this.authService.checkAuthStatus(user);
  }

}




