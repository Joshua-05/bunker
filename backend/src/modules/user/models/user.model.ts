import { Model, Column, Table, HasMany } from 'sequelize-typescript';
import { UserLobby } from 'src/modules/lobbi/models/userLobby.model';

@Table
export class User extends Model {
  @Column
  firstName: string;

  @Column
  username: string;

  @Column
  email: string;

  @Column
  password: string;

  @HasMany(() => UserLobby, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  userLobbi: UserLobby[]
}
