import { Body, Controller, Param, Post } from '@nestjs/common';
import { MensajeService } from './mensaje.service';
import { Mensaje } from './model/Mensaje.dto';

@Controller('mensaje')
export class MensajeController {

    constructor(private mensajeService: MensajeService) {

    }

    @Post('/:idSala')
    insertMensaje(@Param('idSala') idSala: string, @Body() mensaje: Mensaje) {
        return this.mensajeService.insertMensaje(idSala, mensaje);
    }
}
