import { Module } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipment } from './entities';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [EquipmentController],
  providers: [EquipmentService],
  imports: [
    TypeOrmModule.forFeature([Equipment]),
    AuthModule
  ],
  exports: [
    EquipmentService,
    TypeOrmModule
  ]

})
export class EquipmentModule { }
