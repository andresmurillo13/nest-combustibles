import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { User } from '../auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipment } from './entities';
import { Repository } from 'typeorm';
import { PaginationDto } from '../common/dtos/pagination.dto';


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


      return { ...equipment, user: user.fullName }

    } catch (error) {
      this.handleDBExceptions(error);
    }
  }


  async findAll(paginationDto: PaginationDto) {

    const { limit = 10, offset = 0 } = paginationDto;
    try {
      const equipments = await this.equipmentRepository.find({
        take: limit,
        skip: offset,
      });
      const totalEquipments = await this.equipmentRepository.count();
      const totalPages = Math.ceil(totalEquipments / limit);
      const currentPage = Math.floor(offset / limit) + 1;
      const result = equipments.map(equipment => (equipment));

      const results = result.map((equipment) => ({
        ...equipment,
        user: equipment.user.fullName,

      }))

      const response = {
        limit,
        offset,
        totalEquipments,
        totalPages,
        currentPage,
        results

      };
      return response;

    } catch (error) {
      this.handleDBExceptions(error)
    }
  }

  async update(id: string, updateEquipmentDto: UpdateEquipmentDto) {
    const { placa, ...toUpdate } = updateEquipmentDto
    const equipment = await this.equipmentRepository.preload({ id, ...toUpdate })
    if (!equipment) throw new NotFoundException(`Equipo: ${id} no encontrado`);

    try {
      await this.equipmentRepository.save(equipment);
      return equipment;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findOne(id: string) {
    const equipment = await this.equipmentRepository.findOneBy({ id });
    if (!equipment) {
      throw new NotFoundException(`Equipo con el${id} no encontrado`);
    }
    return equipment
  }


  async remove(id: string) {
    try {
      const equipment = await this.findOne(id);
      await this.equipmentRepository.update(id, { isActive: false });
      return equipment;
    } catch (error) {
      this.handleDBExceptions(error)
    }
  }

  private handleDBExceptions(error: any) {

    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    this.logger.error(error)

    throw new InternalServerErrorException('Unexpected error, check server logs');

  }
}
