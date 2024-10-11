import { Model, Column, Table } from 'sequelize-typescript';

@Table
export class Lobbi extends Model {
  @Column
  name: string;

  @Column
  count: number;

  @Column
  access: string;

  @Column
  password?: string;
}
