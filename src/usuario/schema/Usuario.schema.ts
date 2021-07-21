import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UsuarioDocument = Usuario & Document;

@Schema()
export class Usuario {

    @Prop({ required: true })
    nickName: string;
}

export const UsuarioSchema = SchemaFactory.createForClass( Usuario );