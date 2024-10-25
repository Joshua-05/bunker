import { Injectable, NotFoundException } from '@nestjs/common';
import { Lobbi } from './models/lobbi.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateLobbiDTO } from './dto';
import { where } from 'sequelize';

@Injectable()
export class LobbiService {
    constructor(
        @InjectModel(Lobbi) private readonly lobbiRepository: typeof Lobbi,
    ){}

    async createLobbi(dto: CreateLobbiDTO): Promise<CreateLobbiDTO>{
        const lobbi = await this.lobbiRepository.create({
            name: dto.name,
            current: dto.current,
            count: dto.count,
            access: dto.access,
            password: dto.password
        });
        return lobbi;
    }
    async findAllLobbi(){
        return this.lobbiRepository.findAll();
    }
    async findOneLobbi(id: number){
        const lobbi = await this.lobbiRepository.findOne({where: {id: id}});
        if(!lobbi){
            throw new NotFoundException(`Lobby with ID ${id} not found`);
        }
        return lobbi;  
    }
    async updateCurrent(id: number, action: 'descrement' | 'increment'){
        const lobbi = await this.lobbiRepository.findOne({where: {id: id}});
        if(!lobbi){
            throw new NotFoundException(`Lobby with ID ${id} not found`);
        }
        if (action === 'increment') {
            lobbi.current += 1
        } else if (action === 'descrement') {
            lobbi.current -= 1
        }
        await lobbi.save()
        return lobbi
    }
}
