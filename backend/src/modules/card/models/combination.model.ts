import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Card } from "./card.model";

@Table
export class Combination extends Model{
    @ForeignKey(() => Card)
    @Column
    cardId: number;

    @ForeignKey(() => Card)
    @Column
    associatedCardId: number;

    @Column
    importance: number;
}