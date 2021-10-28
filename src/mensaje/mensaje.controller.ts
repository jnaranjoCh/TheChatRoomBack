import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MensajeService } from './mensaje.service';
import { MensajeDto } from './model/Mensaje.dto';

@Controller('mensaje')
export class MensajeController {

    constructor(private mensajeService: MensajeService) {

    }

    @Post('/')
    insertMensaje(@Body() mensaje: MensajeDto) {
        return this.mensajeService.insertMensaje(mensaje);
    }

    @Get('/:idSala')
    getMensajeSala(@Param('idSala') idSala: string) {
        return this.mensajeService.getMensajeSala(idSala);
    }
}
