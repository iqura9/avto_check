import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";



@Controller('api/users')
export class UsersController {

    constructor( private userServise: UsersService) {}

}
