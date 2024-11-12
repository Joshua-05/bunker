import { Model, Column, Table, HasMany, BelongsToMany } from 'sequelize-typescript';
import { Lobbi } from 'src/modules/lobbi/models/lobbi.model';
import { UserLobby } from 'src/modules/connectRoom/models/userLobby.model';

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

  // @HasMany(() => UserLobby, {
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE'
  // })
  // userLobbi: UserLobby[]
  @BelongsToMany(() => Lobbi, () => UserLobby)
  lobbys: Lobbi[]
}
