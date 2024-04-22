import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { WebsocketsService } from './websockets.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dtos/new-message.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interfaces';

@WebSocketGateway({ cors: true })
export class WebsocketsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server

  constructor(
    private readonly websocketsService: WebsocketsService,
    private readonly jwtService: JwtService
  ) { }


  async handleConnection(client: Socket) {

    const token = client.handshake.headers.authentication as string;
    let payload: JwtPayload

    try {
      payload = this.jwtService.verify(token);
      await this.websocketsService.registerClient(client, payload.id)
    } catch (error) {
      client.disconnect();
      return;
    }

    this.wss.emit('clients-updated', this.websocketsService.getConnectedClients())

  }


  handleDisconnect(client: Socket) {
    this.websocketsService.removeClient(client.id)

    this.wss.emit('clients-updated', this.websocketsService.getConnectedClients())
  }

  @SubscribeMessage('message-from-client')
  onMessageFromClient(client: Socket, payload: NewMessageDto) {

    this.wss.emit('message-from-server', {
      fullName: this.websocketsService.getUserFullName(client.id),
      message: payload.message || 'no message!!'
    })

  }

}
