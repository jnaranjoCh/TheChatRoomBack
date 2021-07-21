import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsuarioDto } from './model/Usuario.dto';
import { Usuario } from './schema/Usuario.schema';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {

    constructor( private usuarioService: UsuarioService) {

    }

    @Get('/:nickName')
    getFindNickName(@Param('nickName') nickName: string) {        
        return this.usuarioService.getUsuario( nickName );
    }

    @Post()
    postCreateUsuario(@Body() usuario: UsuarioDto) {
        return this.usuarioService.createUsuario( usuario );
    }
}
