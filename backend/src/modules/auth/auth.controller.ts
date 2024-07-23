import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../user/dto';
import { UserLoginDTO } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('register')
    register (@Body() dto: CreateUserDTO): Promise<CreateUserDTO>{
        return this.authService.registrUser(dto)
    }

    @Post('login')
    login(@Body() dto:UserLoginDTO) {
        return this .authService.loginUser(dto)
    }
}
