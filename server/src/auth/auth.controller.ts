import {Body, Controller, Get, Post, UseGuards, ValidationPipe} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../Users/dto/create-user.dto";
import {IReadableUser} from "../Users/interface/readable-user.interface";
import {SignInDto} from "./dto/signin.dto";
import {JwtStrategy} from "./jwt.strategy";
import {UsersService} from "../Users/users.service";
import {AdminAuthGuard} from "./auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
                private readonly userServise: UsersService) { }

    @Post('/signUp')
    async signUp(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<boolean> {
        return this.authService.signUp(createUserDto);
    }

    @Post('/signIn')
    async signIn(@Body(new ValidationPipe()) signInDto: SignInDto): Promise<IReadableUser> {
        return await this.authService.signIn(signInDto);
    }

    //@UseGuards(AuthGuard('jwt'))
    @UseGuards(AdminAuthGuard)
    @Get()
    findAll(){
        return this.userServise.findAll();
    }
}
