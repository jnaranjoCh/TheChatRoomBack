import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mensaje } from 'src/mensaje/model/Mensaje.dto';
import { Usuario, UsuarioDocument } from 'src/usuario/schema/Usuario.schema';
import { Sala, SalaDocument } from './schema/Sala.schema';

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

                const req = await this.salaModel.find({ idUsuarioReqResp: usuario }).exec();
                const resp = await this.salaModel.find({ idUsuarioRespReq: usuario }).exec();

                return req.concat(resp);
            }

        } catch (error) {
            throw new NotFoundException(error);
        }
    }

    async createSala(reqResp: string, respReq: string): Promise<Sala> {

        try {
            
            const usuarioReq = await this.usuarioModel.findOne({ nickName: reqResp }).exec();
            const usuarioResp = await this.usuarioModel.findOne({ nickName: respReq }).exec();
            
            if (!usuarioReq || !usuarioResp) {
                throw new HttpException('Alguno de los usuarios no existen', HttpStatus.NOT_ACCEPTABLE);
            } else {

                const req = await this.salaModel.findOne({ idUsuarioReqResp: usuarioReq, idUsuarioRespReq: usuarioResp }).exec();
                const resp = await this.salaModel.findOne({ idUsuarioReqResp: usuarioResp, idUsuarioRespReq: usuarioReq }).exec();

                if (req || resp) {
                    
                    const result =  req ? req : resp;
                    result.idUsuarioReqResp = await this.usuarioModel.findById(result.idUsuarioReqResp).exec();
                    result.idUsuarioRespReq = await this.usuarioModel.findById(result.idUsuarioRespReq).exec();

                    return result;

                } else {

                    const sala = new Sala();
                    sala.idUsuarioReqResp = usuarioReq;
                    sala.idUsuarioRespReq = usuarioResp;
                    sala.mensajes = new Array<Mensaje>();
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
