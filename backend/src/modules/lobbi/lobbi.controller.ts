import { Body, Controller, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { LobbiService } from './lobbi.service';
import { CreateLobbiDTO } from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('lobbis')
export class LobbiController {
    constructor(private readonly lobbiService: LobbiService) {}

    @ApiTags('API')
    @ApiResponse({ status: 201, type: CreateLobbiDTO })
    @HttpCode(201)
    @Post('create')
    create(@Body() dto: CreateLobbiDTO): Promise<CreateLobbiDTO> {
        return this.lobbiService.createLobbi(dto)
    }

    @ApiTags('API')
    @ApiResponse({ status: 200 })
    @HttpCode(200)
    @Get('getAll')
    getAll(){
        return this.lobbiService.findAllLobbi()
    }

    @ApiTags('API')
    @ApiResponse({ status: 200, type: CreateLobbiDTO  })
    @HttpCode(200)
    @Get('getOne/:id')
    getOne(@Param('id') id: number){
        return this.lobbiService.findOneLobbi(id)
    }

    @ApiTags('API')
    @ApiResponse({ status: 200, type: CreateLobbiDTO  })
    @HttpCode(200)
    @Put('lobbiCurrent/:id')
    updateCurrent(
        @Param('id') id: number,
        @Body() body: { action: 'descrement' | 'increment' }){
        return this.lobbiService.updateCurrent(id, body.action)
    }
}
