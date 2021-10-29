import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SalaDocument, Sala } from 'src/sala/schema/Sala.schema';
import { UsuarioDocument } from 'src/usuario/schema/Usuario.schema';
import { MensajeDto } from './model/Mensaje.dto';
import { Mensaje, MensajeDocument } from './schema/Mensaje.schema';
import { Usuario } from '../usuario/schema/Usuario.schema';

@Injectable()
export class MensajeService {

    constructor(@InjectModel(Sala.name) private salaModel: Model<SalaDocument>,
                @InjectModel(Mensaje.name) private mensajeModel: Model<MensajeDocument>,
                @InjectModel(Usuario.name) private usuarioModel: Model<UsuarioDocument>) {
    }

    async insertMensaje(mensaje: MensajeDto): Promise<Mensaje> {

        try {

            if (mensaje.fecha === undefined || mensaje.texto === undefined)
                throw new HttpException('Falta un dato', HttpStatus.BAD_REQUEST);

            const sala = await this.salaModel.findById(mensaje.idSala);
            const userOne = await this.usuarioModel.findById(mensaje.idUserEmisor);
            const userTwo = await this.usuarioModel.findById(mensaje.idUserReceptor);

            if (!sala)
                throw new HttpException('La sala no existe', HttpStatus.NOT_ACCEPTABLE);

            if (!userOne || !userTwo)
                throw new HttpException('Uno de los usuarios no existe', HttpStatus.NOT_ACCEPTABLE);

            const newMensaje = new Mensaje();

            sala.ultimoMsg = mensaje.texto;

            newMensaje.fecha = new Date();
            newMensaje.texto = mensaje.texto;
            newMensaje.sala = sala;
            newMensaje.usuarioEmisor = userOne;
            newMensaje.usuarioReceptor = userTwo;

            const salaUpdate = await this.salaModel.findByIdAndUpdate(mensaje.idSala, sala);
    
            return await this.mensajeModel.create(newMensaje);
            
        } catch (error) {
            throw new NotFoundException(error);
        }
    }

    async getMensajeSala(idSala: string) {

        if (idSala == null || idSala === '')
            throw new HttpException('No hay información de la sala', HttpStatus.NOT_ACCEPTABLE);      

        const sala = await this.salaModel.findById(idSala);

        if (!sala)
            throw new HttpException('La sala no existe', HttpStatus.NOT_ACCEPTABLE);

        return await this.mensajeModel.find({ sala: sala }).limit(50).exec();
    }
}
