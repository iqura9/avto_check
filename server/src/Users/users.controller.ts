import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";



@Controller('api/users')
export class UsersController {

    constructor( private userServise: UsersService) {}
    @Get()
    getAll(){
        return this.userServise.getAll();
    }
    @Post('/signIn')
    signIn(@Body() dto:CreateUserDto){
        return this.userServise.signIn(dto);
    }
    @Post('/signUp')
    signUp(@Body() dto:CreateUserDto){
        return this.userServise.signUp(dto);
    }
}
