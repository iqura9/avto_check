import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {JwtStrategy} from "../auth/jwt.strategy";



@Controller('api/users')
export class UsersController {

    constructor( private userServise: UsersService) {}


}
