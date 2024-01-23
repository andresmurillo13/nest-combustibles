import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { Auth, GetUser } from '../auth/decorators';
import { User } from '../auth/entities/user.entity';

@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) { }

  @Post('crear')
  @Auth()
  create(@Body() createEquipmentDto: CreateEquipmentDto,
    @GetUser() user: User
  ) {

    return this.equipmentService.create(createEquipmentDto, user);
  }

  @Get()
  findAll() {
    return this.equipmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipmentDto: UpdateEquipmentDto) {
    return this.equipmentService.update(+id, updateEquipmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipmentService.remove(+id);
  }
}
