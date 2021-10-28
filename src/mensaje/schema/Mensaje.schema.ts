import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Sala } from "src/sala/schema/Sala.schema";
import { Usuario } from "src/usuario/schema/Usuario.schema";
import * as mongoose from 'mongoose';

export type MensajeDocument = Mensaje & Document;

@Schema()
export class Mensaje {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' })
    usuarioEmisor: Usuario;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' })
    usuarioReceptor: Usuario;
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Sala' })
    sala: Sala;
    
    @Prop({ required: true })
    texto: string;

    @Prop({ required: true })
    fecha: Date;
}

export const MensajeSchema = SchemaFactory.createForClass( Mensaje );