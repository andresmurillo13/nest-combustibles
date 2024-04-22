import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { AuthModule } from 'src/auth/auth.module';
import { EquipmentModule } from 'src/equipment/equipment.module';
import { ApplicationsModule } from 'src/applications/applications.module';

@Module({
  controllers: [CommonController],
  providers: [CommonService],
  imports: [
    AuthModule,
    EquipmentModule,
    ApplicationsModule
  ],
  exports: [
    CommonService
  ]
})
export class CommonModule { }
