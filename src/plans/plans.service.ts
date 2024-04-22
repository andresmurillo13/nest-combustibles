import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from './entities/plan.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class PlansService {

  private readonly logger = new Logger('PlanService')

  constructor(
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>
  ) { }

  async create(createPlanDto: CreatePlanDto, user: User) {
    try {
      const { ...planDetails } = createPlanDto;

      const plan = this.planRepository.create({
        ...planDetails,
        user

      })

      await this.planRepository.save(plan)


      return { ...plan, user: user.fullName }

    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {

    const { limit = 10, offset = 0 } = paginationDto;
    try {
      const plans = await this.planRepository.find({
        take: limit,
        skip: offset,
      });
      const totalPlans = await this.planRepository.count();
      const totalPages = Math.ceil(totalPlans / limit);
      const currentPage = Math.floor(offset / limit) + 1;
      const result = plans.map(plan => (plan));

      const results = result.map((plan) => ({
        ...plan,
        user: plan.user.fullName,

      }))

      const response = {
        limit,
        offset,
        totalPlans,
        totalPages,
        currentPage,
        results

      };
      return response;

    } catch (error) {
      this.handleDBExceptions(error)
    }
  }
  async update(id: string, updateEquipmentDto: UpdatePlanDto) {
    const { ...toUpdate } = updateEquipmentDto
    const plan = await this.planRepository.preload({ id, ...toUpdate })
    if (!plan) throw new NotFoundException(`Plan: ${id} no encontrado`);

    try {
      await this.planRepository.save(plan);
      return plan;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findOne(id: string) {
    const plan = await this.planRepository.findOneBy({ id });
    if (!plan) {
      throw new NotFoundException(`Plan con el${id} no encontrado`);
    }
    return plan
  }

  async remove(id: string) {
    try {
      const plan = await this.findOne(id);
      await this.planRepository.remove(plan);
      return plan;
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
