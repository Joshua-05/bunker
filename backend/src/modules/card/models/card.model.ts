import { Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Combination } from "./combination.model";

@Table
export class Card extends Model{
    @Column
    type: string;

    @Column
    name: string;

    @Column
    importance: number;

    @Column
    descripton: string;

    // @ForeignKey(() => Combination)
    // @Column
    // combinationId?: number;

    @HasMany(() => Combination)
    combinations: Combination[];
}