import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Application } from './entities/application.entity';
import { EquipmentModule } from 'src/equipment/equipment.module';

@Module({
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
  imports: [
    TypeOrmModule.forFeature([Application]),
    AuthModule,
    EquipmentModule
  ],
  exports: [
    ApplicationsService,
    TypeOrmModule
  ]
})
export class ApplicationsModule { }
