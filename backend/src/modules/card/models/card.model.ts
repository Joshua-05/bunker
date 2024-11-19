import { Column, Model, Table } from "sequelize-typescript";

@Table
export class Card extends Model{
    @Column
    type: string

    @Column
    name: string

    @Column
    important: number

    @Column
    description: string

    @ForeignKey(() => ...)
    @Column
    combinationId: number;

    @BelongsTo(() => ...)
    combination: ...;
}