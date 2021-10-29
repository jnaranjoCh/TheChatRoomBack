import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsuarioDto } from './model/Usuario.dto';
import { Usuario, UsuarioDocument } from './schema/Usuario.schema';

@Injectable()
export class UsuarioService {

    constructor(@InjectModel(Usuario.name) private usuarioModel: Model<UsuarioDocument>) {

    }

    async getUsuario( nickName: string) {

        try {
            
            const resp = await this.usuarioModel.findOne({ nickName: nickName }).exec();

            return resp ? resp : {};

        } catch (error) {
         
            throw new NotFoundException();
        }
    }

    async createUsuario( usuarioDto: UsuarioDto): Promise<Usuario> {

        try {

            const existUsuario = await this.usuarioModel.findOne({ nickName: usuarioDto.nickName }).exec();
            
            if (!existUsuario) {

                const usuario = new Usuario();
                usuario.nickName = usuarioDto.nickName;
    
                return await this.usuarioModel.create( usuario );
            } else
                return existUsuario;

        } catch (error) {
         
            throw new NotFoundException();
        }
    }
}
