import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { GameService } from './game.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateGameDTO } from './dto/CreateGame';

@Controller('game')
export class GameController {
    constructor(private readonly gameService: GameService){}

    @ApiTags('Games')
    @ApiResponse({ status: 201, type: CreateGameDTO })
    @HttpCode(201)
    @Post('create')
    create(@Body() dto: CreateGameDTO){
        return this.gameService.createGame(dto)
    }
}
