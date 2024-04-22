import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { User } from '../auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { Point, Repository } from 'typeorm';
import { Equipment } from '../equipment/entities';

@Injectable()
export class ApplicationsService {


  private readonly logger = new Logger('ApplicationsService')

  constructor(
    @InjectRepository(Application)
    private readonly applicationsRepository: Repository<Application>,
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>
  ) { }



  async create(createApplicationDto: CreateApplicationDto, user: User, id: string) {

    const equipment = await this.equipmentRepository.findOneBy({ id });
    if (!equipment) {
      throw new NotFoundException(`Equipo con el${id} no encontrado`);
    }

    try {

      const { ...applicationsDetails } = createApplicationDto;

      const application = this.applicationsRepository.create({
        ...applicationsDetails,
        user,
        equipment
      });
      await this.applicationsRepository.save(application)

      return { ...application, user: user.fullName, equipment: equipment.name }


    } catch (error) {
      this.handleDBExceptions(error)
      console.log(error)
    }
  }

  async findAll() {
    try {
      const aplications = await this.applicationsRepository.find()

      const results = aplications.map((aplication) => ({
        ...aplication,
        user: aplication.user.fullName,
        equipment: aplication.equipment.name
      }))
      return results


    } catch (error) {
      this.handleDBExceptions(error)
    }
  }

  async findOne(id: string) {
    const application = await this.applicationsRepository.findOneBy({ id });
    if (!application) {
      throw new NotFoundException(`Aplicación con el${id} no encontrado`);
    }
    return application
  }

  async update(updateApplicationDto: UpdateApplicationDto, user: User, id: string,) {

    const { id: frontId, equipment, user: frontUser, ...toUpdate } = updateApplicationDto;

    const application = await this.applicationsRepository.preload({ id, user, ...toUpdate })
    if (!application) throw new NotFoundException(`Aplicacion: ${id} no encontrado`);
    try {
      await this.applicationsRepository.save(application);
      return { ...application, user: user.fullName }
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    try {
      const application = await this.findOne(id);
      await this.applicationsRepository.remove(application);
      return application;

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
