import { Injectable, NotFoundException } from '@nestjs/common';
import { Lobbi } from './models/lobbi.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateLobbiDTO } from './dto';
import { where } from 'sequelize';
import { UserLobby } from './models/userLobby.model';
import { User } from '../user/models/user.model';
import { LobbyListGateway } from 'src/websocket/Gateway/lobbyList.gateway';

@Injectable()
export class LobbiService {
    constructor(
        @InjectModel(Lobbi) private readonly lobbiRepository: typeof Lobbi,
        @InjectModel(UserLobby) private readonly userLobbiRepository: typeof UserLobby,
        private readonly lobbyListGateway: LobbyListGateway
    ){}

    async createLobbi(dto: CreateLobbiDTO): Promise<CreateLobbiDTO>{
        const lobbi = await this.lobbiRepository.create({
            name: dto.name,
            current: dto.current,
            count: dto.count,
            access: dto.access,
            password: dto.password
        });
        this.lobbyListGateway.server.emit('lobbyCreated', lobbi)
        return lobbi;
    }
    async findAllLobbi(){
        return this.lobbiRepository.findAll({
            order: [
                ['id', 'ASC']
            ]
        });
    }
    async findOneLobbi(id: number){
        const lobbi = await this.lobbiRepository.findOne({where: {id: id}});
        if(!lobbi){
            throw new NotFoundException(`Lobby with ID ${id} not found`);
        }
        return lobbi;  
    }
    async updateCurrent(id: number, action: 'descrement' | 'increment', userId: number){
        const lobbi = await this.lobbiRepository.findOne({where: {id: id}});

        if(!lobbi){
            throw new NotFoundException(`Lobby with ID ${id} not found`);
        }

        switch(action){
            case 'increment':
                if (lobbi.current < lobbi.count){
                    await this.userLobbiRepository.create({ lobbyId: id, userId: userId })
                    lobbi.current += 1
                    await lobbi.save()
                    this.lobbyListGateway.server.emit('lobbyUpdated', lobbi);
                    return lobbi
                }
                else {
                    throw new NotFoundException(`Lobby with ID ${id} full limit`)
                }
            case 'descrement':
                lobbi.current -= 1
                const deleteUserToLobbi = await this.userLobbiRepository.findAll({where: {
                    userId: userId,
                    lobbyId: id
                } })
                if (deleteUserToLobbi) {
                    await deleteUserToLobbi.map(item => item.destroy());
                }
                if (lobbi.current === 0){
                    this.lobbyListGateway.server.emit('lobbyDeleted', lobbi.id)
                    await lobbi.destroy()
                    return { message: "Lobby deleted" }
                }
                await lobbi.save()
                this.lobbyListGateway.server.emit('lobbyUpdated', lobbi);
                return lobbi
        }
    }
    async getUsersForLobby(lobbyId: number) {
        const users = await this.userLobbiRepository.findAll({
            where: { lobbyId },
            include: [User],
        });
    
        if (!users) {
            throw new NotFoundException(`No users found for lobby ID ${lobbyId}`);
        }
    
        return users; 
    }
}
