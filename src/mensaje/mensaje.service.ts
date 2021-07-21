import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sala, SalaDocument } from '../sala/schema/Sala.schema';
import { Mensaje } from './model/Mensaje.dto';

@Injectable()
export class MensajeService {

    constructor(@InjectModel(Sala.name) private salaModel: Model<SalaDocument>) {
    }

    async insertMensaje(idSala: string, mensaje: Mensaje): Promise<Sala> {

        try {

            if (mensaje.fecha === undefined || mensaje.texto === undefined || mensaje.reqOrResp === undefined)
                throw new HttpException('Falta un dato', HttpStatus.BAD_REQUEST);

            const sala = await this.salaModel.findById(idSala);

            if (!sala)
                throw new HttpException('La sala no existe', HttpStatus.NOT_ACCEPTABLE);

            sala.mensajes.push(mensaje);

            return await this.salaModel.findByIdAndUpdate(idSala, sala);          
            
        } catch (error) {
            throw new NotFoundException(error);
        }
    }
}
