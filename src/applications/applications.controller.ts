import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Auth, GetUser } from '../auth/decorators';
import { User } from '../auth/entities/user.entity';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) { }

  @Post('post/:id')
  @Auth()
  create(@Body() createApplicationDto: CreateApplicationDto,
    @GetUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.applicationsService.create(createApplicationDto, user, id);
  }

  @Get('get')
  @Auth()
  findAll() {
    return this.applicationsService.findAll();
  }


  @Patch(':id')
  @Auth()
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
    @Body() updateApplicationDto: UpdateApplicationDto) {
    return this.applicationsService.update(updateApplicationDto, user, id);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.applicationsService.remove(id);
  }
}
