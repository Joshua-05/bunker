import { Injectable } from '@nestjs/common';
import { Card } from './models/card.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCardDTO } from './dto';

@Injectable()
export class CardService {
    constructor(
        @InjectModel(Card) private readonly cardRepository: typeof Card
    ){}

    async createCard(dto: CreateCardDTO): Promise<CreateCardDTO>{
        const card = await this.cardRepository.create({
            type: dto.type,
            name: dto.name,
            importance: dto.importance,
            descripton: dto.descripton,
            combination: []
        });
        return card;
    }

    async findAllCard(): Promise<CreateCardDTO[]>{
        return this.cardRepository.findAll({
            order: [
                ['id', 'ASC']
            ]
        });
    }
}
