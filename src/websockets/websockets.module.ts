import { Module } from '@nestjs/common';
import { WebsocketsService } from './websockets.service';
import { WebsocketsGateway } from './websockets.gateway';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [WebsocketsGateway, WebsocketsService],
  imports: [
    AuthModule
  ]
})
export class WebsocketsModule { }
