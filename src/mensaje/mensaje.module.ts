import { Module } from '@nestjs/common';
import { MensajeService } from './mensaje.service';
import { MensajeController } from './mensaje.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SalaSchema, Sala } from '../sala/schema/Sala.schema';
import { Usuario, UsuarioSchema } from '../usuario/schema/Usuario.schema';
import { Mensaje, MensajeSchema } from './schema/Mensaje.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioSchema }]),
    MongooseModule.forFeature([{ name: Sala.name, schema: SalaSchema }]),
    MongooseModule.forFeature([{ name: Mensaje.name, schema: MensajeSchema }])
  ],
  providers: [MensajeService],
  controllers: [MensajeController]
})
export class MensajeModule {}
