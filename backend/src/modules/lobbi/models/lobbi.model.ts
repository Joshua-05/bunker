import { Model, Column, Table } from 'sequelize-typescript';

@Table
export class Lobbi extends Model {
  @Column
  name: string;

  @Column
  participants: string;

  @Column
  space: string;

  @Column
  access: string;
}
