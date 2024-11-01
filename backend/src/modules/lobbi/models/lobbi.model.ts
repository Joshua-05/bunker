import { Model, Column, Table } from 'sequelize-typescript';
import { User } from 'src/modules/user/models/user.model';

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
}

@Table
export class Lobbi_User extends Model {
  @Column
  lobbyId: number;
  @Column
  userId: number;
}

Lobbi.belongsToMany(User, {
  through: Lobbi_User,
  foreignKey: 'lobbyId',
});

User.belongsToMany(Lobbi, {
  through: Lobbi_User,
  foreignKey: 'userId',
});