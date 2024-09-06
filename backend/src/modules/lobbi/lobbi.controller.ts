import { Body, Controller, Get, Post } from '@nestjs/common';
import { LobbiService } from './lobbi.service';
import { CreateLobbiDTO } from './dto';

@Controller('lobbi')
export class LobbiController {
    constructor(private readonly lobbiService: LobbiService) {}

    @Post('create')
    create(@Body() dto: CreateLobbiDTO): Promise<CreateLobbiDTO> {
        return this.lobbiService.createLobbi(dto)
    }

    @Get('getAll')
    getAll(){
        return this.lobbiService.findAllLobbi()
    }
}
