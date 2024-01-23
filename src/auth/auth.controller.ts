import { Controller, Get, Post, Body, UseGuards, Patch, Param, ParseUUIDPipe, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetUser, Auth } from './decorators';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { User } from './entities/user.entity';

import { ValidRoles } from './interfaces';

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
  async getAllUsers() {
    return await this.authService.getAllUsers();
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Patch(':id')
  @Auth()
  updateUser
    (
      @Param('id', ParseUUIDPipe) id: string,
      @Body() updateUserDto: UpdateUserDto
    ) {
    return this.authService.update(id, updateUserDto)
  }

  @Delete(':id')
  @Auth()
  deleteUser(
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




