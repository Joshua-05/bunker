import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateCardDTO{
    @ApiProperty()
    @IsNumber()
    id_game: number;
}