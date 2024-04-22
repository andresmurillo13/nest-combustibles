import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) { }

  @Post('post')
  @Auth()
  create(
    @Body() createPlanDto: CreatePlanDto,
    @GetUser() user: User) {
    return this.plansService.create(createPlanDto, user);
  }

  @Get('get')
  @Auth()
  findAll(
    @Query() paginationDto: PaginationDto
  ) {
    return this.plansService.findAll(paginationDto);
  }

  @Patch(':id')
  @Auth()
  update
    (
      @Param('id', ParseUUIDPipe) id: string,
      @Body() updatePlanDto: UpdatePlanDto
    ) {
    return this.plansService.update(id, updatePlanDto);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.plansService.remove(id);
  }
}
