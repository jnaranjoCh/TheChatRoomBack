import { Module } from '@nestjs/common';
import { MensajeService } from './mensaje.service';
import { MensajeController } from './mensaje.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SalaSchema, Sala } from '../sala/schema/Sala.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sala.name, schema: SalaSchema }])
  ],
  providers: [MensajeService],
  controllers: [MensajeController]
})
export class MensajeModule {}
