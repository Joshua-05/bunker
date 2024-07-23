import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDTO } from '../user/dto';
import { AppError } from 'src/common/constants/errors';
import { UserLoginDTO } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async registrUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
    const existUser = await this.userService.findUserByEmail(dto.email);
    if (existUser) throw new BadRequestException(AppError.USER_EXIST);
    return this.userService.createUser(dto);
  }

  async loginUser(dto: UserLoginDTO) {
    const existUser = await this.userService.findUserByEmail(dto.email)
    if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIS)
    const validPassword = await bcrypt.compare(dto.password, existUser.password)
    if (!validPassword) throw new BadRequestException(AppError.WRONG_DATA)
    return existUser
  }
}
