import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SalaService } from './sala.service';
import { Sala } from './schema/Sala.schema';
import { SalaDto } from './model/Sala.dto';

@Controller('sala')
export class SalaController {

    constructor( private salaService: SalaService) {

    }

    @Get('/:usuario')
    getSalas(@Param('usuario') usuario: string) {
        return this.salaService.getFindSalas(usuario);
    }

    @Post('/')
    createSala(@Body() sala: SalaDto) {
        return this.salaService.createSala(sala);
    }

    @Delete('/:idSala')
    deleteSala(@Param('idSala') idSala: string) {
        return this.salaService.deleteSala(idSala);
    }
}
