import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { EquipmentModule } from './equipment/equipment.module';
import { CommonModule } from './common/common.module';
import { ApplicationsModule } from './applications/applications.module';
import { WebsocketsModule } from './websockets/websockets.module';
import { PlansModule } from './plans/plans.module';
import { EmailModule } from './email/email.module';


@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),

    AuthModule,

    EquipmentModule,

    CommonModule,

    ApplicationsModule,

    WebsocketsModule,

    PlansModule,

    EmailModule,

  
  ],
})
export class AppModule {}
