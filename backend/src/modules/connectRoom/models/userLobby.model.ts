import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/modules/user/models/user.model";
import { Lobbi } from "../../lobbi/models/lobbi.model";

@Table({createdAt: false, updatedAt: false})
export class UserLobby extends Model{
    @ForeignKey(() => Lobbi)
    @Column
    lobbyId: number

    @ForeignKey(() => User)
    @Column
    userId: number
}