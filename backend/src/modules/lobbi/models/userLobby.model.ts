import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/modules/user/models/user.model";
import { Lobbi } from "./lobbi.model";

@Table
export class UserLobby extends Model{
    @ForeignKey(() => Lobbi)
    @Column
    lobbyId: number

    @ForeignKey(() => User)
    @Column
    userId: number
}