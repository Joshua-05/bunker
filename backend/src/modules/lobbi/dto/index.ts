import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateLobbiDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  participants: string;

  @ApiProperty()
  @IsString()
  space: string;

  @ApiProperty()
  @IsString()
  access: string;
}
