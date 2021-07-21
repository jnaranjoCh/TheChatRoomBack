import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Usuario } from "src/usuario/schema/Usuario.schema";
import * as mongoose from 'mongoose';
import { Mensaje } from "src/mensaje/model/Mensaje.dto";

export type SalaDocument = Sala & Document;

@Schema()
export class Sala {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' })
    idUsuarioReqResp: Usuario;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' })
    idUsuarioRespReq: Usuario;

    @Prop({ required: true })
    mensajes: Array<Mensaje>;
}

export const SalaSchema = SchemaFactory.createForClass( Sala );