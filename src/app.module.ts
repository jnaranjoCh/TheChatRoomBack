import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { SalaModule } from './sala/sala.module';
import { MensajeModule } from './mensaje/mensaje.module';
import { ChatGateway } from './socket-io/chatRoom.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    MongooseModule.forRoot( process.env.DB_CONNECTION ),
    UsuarioModule,
    SalaModule,
    MensajeModule
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway ],
})
export class AppModule {}
