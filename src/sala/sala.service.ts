import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario, UsuarioDocument } from 'src/usuario/schema/Usuario.schema';
import { Sala, SalaDocument } from './schema/Sala.schema';
import { SalaDto } from './model/Sala.dto';

@Injectable()
export class SalaService {

    constructor(@InjectModel(Sala.name) private salaModel: Model<SalaDocument>,
                @InjectModel(Usuario.name) private usuarioModel: Model<UsuarioDocument>) {

    }

    async getFindSalas(nickName: string): Promise<Sala[]> {

        try {
            
            const usuario = await this.usuarioModel.findOne({ nickName: nickName }).exec();

            if (!usuario) {

                return [];

            } else {

                const req = await this.salaModel.find({ usuarioEmisor : usuario })
                                    .populate('usuarioEmisor').populate('usuarioReceptor').exec();
                const resp = await this.salaModel.find({ usuarioReceptor: usuario })
                                    .populate('usuarioEmisor').populate('usuarioReceptor').exec();
                const result = req.concat(resp);



                return result;
            }

        } catch (error) {
            throw new NotFoundException(error);
        }
    }

    async getFindSalaById(idSala: string) {

        if (idSala.length < 2)
            throw new HttpException('El id de la sala es incorrecto', HttpStatus.NOT_ACCEPTABLE);

        try {
            
            return await this.salaModel.findById(idSala).populate('usuarioEmisor').populate('usuarioReceptor');

        } catch (error) {
            throw new NotFoundException(error);
        }
    }

    async createSala(sala: SalaDto): Promise<Sala> {

        try {
            
            const usuarioReq = await this.usuarioModel.findOne({ nickName: sala.usuarioEmisor }).exec();
            const usuarioResp = await this.usuarioModel.findOne({ nickName: sala.usuarioReceptor }).exec();
            
            if (!usuarioReq || !usuarioResp) {
                throw new HttpException('Alguno de los usuarios no existen', HttpStatus.NOT_ACCEPTABLE);
            } else {

                const req = await this.salaModel.findOne({ usuarioEmisor: usuarioReq, usuarioReceptor: usuarioResp })
                            .populate('usuarioEmisor').populate('usuarioReceptor').exec();
                const resp = await this.salaModel.findOne({ usuarioEmisor: usuarioResp, usuarioReceptor: usuarioReq })
                            .populate('usuarioEmisor').populate('usuarioReceptor').exec();

                if (req || resp) {

                    return req ? req : resp;

                } else {

                    const sala = new Sala();
                    sala.usuarioEmisor = usuarioReq;
                    sala.usuarioReceptor = usuarioResp;
                    sala.ultimoMsg = '';
                    return await this.salaModel.create(sala);
                }
            }

        } catch (error) {            
            throw new NotFoundException(error);
        }
    }

    async deleteSala(idSala: string): Promise<Sala> {

        try {
            
            return await this.salaModel.findByIdAndDelete(idSala);

        } catch (error) {
            throw new HttpException('Delete Sala Error', HttpStatus.NOT_ACCEPTABLE);
        }
    }
}
