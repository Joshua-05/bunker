import { Injectable } from '@nestjs/common';
import { Lobbi } from './models/lobbi.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateLobbiDTO } from './dto';

@Injectable()
export class LobbiService {
    constructor(
        @InjectModel(Lobbi) private readonly lobbiRepository: typeof Lobbi,
    ){}

    async createLobbi(dto: CreateLobbiDTO): Promise<CreateLobbiDTO>{
        await this.lobbiRepository.create({
            name: dto.name,
            count: dto.count,
            access: dto.access,
            password: dto.password
        });
        return dto;
    }
    async findAllLobbi(){
        return this.lobbiRepository.findAll();
    }
}
