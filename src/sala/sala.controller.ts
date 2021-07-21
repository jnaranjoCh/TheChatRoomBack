import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SalaService } from './sala.service';
import { Sala } from './schema/Sala.schema';

@Controller('sala')
export class SalaController {

    constructor( private salaService: SalaService) {

    }

    @Get('/:usuario')
    getSalas(@Param('usuario') usuario: string) {
        return this.salaService.getFindSalas(usuario);
    }

    @Post('/:reqResp/:respReq')
    createSala(@Param('reqResp') reqResp: string, @Param('respReq') respReq: string) {
        return this.salaService.createSala(reqResp, respReq);
    }

    @Delete('/:idSala')
    deleteSala(@Param('idSala') idSala: string) {
        return this.salaService.deleteSala(idSala);
    }
}
