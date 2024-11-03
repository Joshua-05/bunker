import { Model, Column, Table, HasMany} from 'sequelize-typescript';
import { UserLobby } from './userLobby.model';

@Table
export class Lobbi extends Model {
  @Column
  name: string;

  @Column
  current: number;

  @Column
  count: number;

  @Column
  access: string;

  @Column
  password?: string;

  @HasMany(() => UserLobby, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  userLobbi: UserLobby[]
}