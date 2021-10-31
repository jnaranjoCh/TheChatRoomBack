import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: "theChatRoomFront", allowEIO3: true, cors: {
    origin: ["*", "http://localhost:8080"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
    transports: ['websocket', 'polling']
}})
export class ChatGateway {

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, payload: any): void {

        console.log(payload);

        this.server.emit('msgToClient', payload);
    }
}