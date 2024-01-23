import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { User } from '../auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipment } from './entities';
import { Repository } from 'typeorm';


@Injectable()
export class EquipmentService {


  private readonly logger = new Logger('EquipmentService')

  constructor(
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>


  ) { }



  async create(createEquipmentDto: CreateEquipmentDto, user: User) {
    try {
      const { ...equipmentDetails } = createEquipmentDto;

      const equipment = this.equipmentRepository.create({
        ...equipmentDetails,
        user

      })

      await this.equipmentRepository.save(equipment)

      return equipment

    } catch (error) {
      this.handleDBExceptions(error);
    }
  }


  findAll() {
    return `This action returns all equipment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equipment`;
  }

  update(id: number, updateEquipmentDto: UpdateEquipmentDto) {
    return `This action updates a #${id} equipment`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipment`;
  }

  private handleDBExceptions(error: any) {

    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    this.logger.error(error)

    throw new InternalServerErrorException('Unexpected error, check server logs');

  }
}
