import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { Application } from 'src/applications/entities/application.entity';
import { Equipment } from '../equipment/entities';
import { UsersResults, EquipmentsResults, ApplicationsResult } from '../common/interfaces';


@Injectable()
export class CommonService {


  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>
  ) { }

  async searchUsers(term: string): Promise<UsersResults> {

    let users: User[];

    const queryBuilder = this.userRepository.createQueryBuilder('user');
    users = await queryBuilder
      .where('LOWER(user.fullName) LIKE LOWER(:term) OR LOWER(user.email) LIKE LOWER(:term)', {
        term: `%${term}%`,
      })
      .getMany();

    if (users.length === 0)
      throw new NotFoundException(`Usuarios con el termino:${term} no encontrados.`);

    const result: UsersResults = {
      totalUsers: users.length,
      users,
    };

    return result;

  }

  async searchEquipments(term: string): Promise<EquipmentsResults> {
    let equipments: Equipment[];

    const queryBuilder = this.equipmentRepository.createQueryBuilder('equipment');
    equipments = await queryBuilder
      .where('LOWER(equipment.name) LIKE LOWER(:term) OR LOWER(equipment.placa) LIKE LOWER(:term)', {
        term: `%${term}%`,
      })
      .getMany();

    if (equipments.length === 0)
      throw new NotFoundException(`Equipos con el termino:${term} no encontrados.`);

    const result: EquipmentsResults = {
      totalEquipments: equipments.length,
      equipments,
    };

    return result;
  }

  async searchApplications(term: string): Promise<ApplicationsResult> {
    let applications: Application[];

    const queryBuilder = this.applicationRepository.createQueryBuilder('application');
    applications = await queryBuilder
      .where('LOWER(application.eds) LIKE LOWER(:term)', {
        term: `%${term}%`,
      })
      .getMany();

    if (applications.length === 0)
      throw new NotFoundException(`Equipos con el termino : ${term} no encontrados.`);

    const result: ApplicationsResult = {
      totalApplications: applications.length,
      applications

    };

    return result;
  }

}
