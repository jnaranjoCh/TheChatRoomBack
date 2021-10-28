import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Usuario } from "src/usuario/schema/Usuario.schema";
import * as mongoose from 'mongoose';

export type SalaDocument = Sala & Document;

@Schema()
export class Sala {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' })
    usuarioEmisor: Usuario;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' })
    usuarioReceptor: Usuario;

    @Prop()
    ultimoMsg: string;
}

export const SalaSchema = SchemaFactory.createForClass( Sala );