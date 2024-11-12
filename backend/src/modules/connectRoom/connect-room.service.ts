import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Lobbi } from '../lobbi/models/lobbi.model';
import { UserLobby } from './models/userLobby.model';
import { LobbyListGateway } from '../lobbi/socket/lobbyList.gateway';

@Injectable()
export class ConnectRoomService {
    constructor (
        @InjectModel(Lobbi) private readonly lobbiRepository: typeof Lobbi,
        @InjectModel(UserLobby) private readonly userLobbiRepository: typeof UserLobby,
        private readonly lobbyListGateway: LobbyListGateway
    ){}

    async updateCurrent(id: number, action: 'descrement' | 'increment', userId: number){
        const lobbi = await this.lobbiRepository.findOne({where: {id: id}});

        if(!lobbi){
            throw new NotFoundException(`Lobby with ID ${id} not found`);
        }

        switch(action){
            case 'increment':
                const exist = await this.userLobbiRepository.findOne({where: {userId: userId}})
                if (exist){
                    return lobbi
                }
                if (!exist && lobbi.current < lobbi.count){
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
            where: { lobbyId : lobbyId },
        });
    
        if (!users) {
            throw new NotFoundException(`No users found for lobby ID ${lobbyId}`);
        }
    
        return users; 
    }
}
