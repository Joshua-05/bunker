import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { Card } from "src/modules/card/models/card.model";

@Table
export class Player extends Model{
    @Column
    state: string;

    @HasMany(() => Card)
    cards: Card[]
}