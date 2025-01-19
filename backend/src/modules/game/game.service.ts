import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Game } from './models/game.model';
import { Player } from './models/player.model';
import { CreateGameDTO } from './dto/CreateGame';
import { CardService } from '../card/card.service';

@Injectable()
export class GameService {
    constructor (
        @InjectModel(Game) private readonly gameRepository : typeof Game,
        @InjectModel(Player) private readonly playerRepository : typeof Player,
        private readonly cardRepository: CardService
    ) {}

    async initPlayer(playerData : {userId: number, username: string, id_game: string}){
        const cardList = await this.cardRepository.dealingCards()
        const [player, created] = await this.playerRepository.findOrCreate({
            where: {
                userId : playerData.userId,
                username: playerData.username,
            },
            defaults: {
                gameId : playerData.id_game,
                username: playerData.username, 
                userId : playerData.userId,
                state: 'plays'
            }
        })
        if (!player.cards){
            player.cards = []
        } else {
            return player
        }
        cardList.forEach(item => player.cards.push(item))
        await player.save()
        return player
    }

    async createGame(dto : CreateGameDTO){
        const playerData = {
            userId: dto.userId,
            username: dto.username,
            id_game: dto.id_game,
        }
        const [game, created] = await this.gameRepository.findOrCreate({
            where : {id : dto.id_game},
            defaults: { 
                id: dto.id_game,
                name: dto.name,
                status: 'play',
                count: dto.count,
                players: []
            }
        })

        if (!game.players) {
            game.players = [];
        }

        if (created) {
            const player = await this.initPlayer(playerData)
            if (!game.players){
                game.players = []
            }
            game.players.push(player)
            await game.save()
            return player.cards
        } else {
            const existingPlayer = game.players.find(player => player.userId === dto.userId);
        
            if (existingPlayer) {
                throw new BadRequestException('Игрок уже находится в игре');
            }

            if (game.players.length >= game.count) {
                throw new BadRequestException('Тут уже все кто нужно');
            }         
            
            const player = await this.initPlayer(playerData);
            game.players.push(player);
            await game.save();

            return player.cards;
        }
    }
}
