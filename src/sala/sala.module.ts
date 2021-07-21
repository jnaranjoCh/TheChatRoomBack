import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuario, UsuarioSchema } from 'src/usuario/schema/Usuario.schema';
import { SalaController } from './sala.controller';
import { SalaService } from './sala.service';
import { Sala, SalaSchema } from './schema/Sala.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sala.name, schema: SalaSchema }]),
    MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioSchema }])
  ],
  controllers: [SalaController],
  providers: [SalaService]
})
export class SalaModule {}
