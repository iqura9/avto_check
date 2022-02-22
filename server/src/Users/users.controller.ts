import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {JwtStrategy} from "../auth/jwt.strategy";
import {CreateCartDto} from "../cars/dto/create-cart.dto";
import {ObjectId} from "mongoose";




@Controller('api/users')
export class UsersController {

    constructor( private userServise: UsersService) {}
    @Post()
    addIdOfCar(@Body() dto:CreateCartDto){
        return this.userServise.addIdOfCar(dto);
    }
    @Get(':id')
    getOne(@Param('id') id: string){
        return this.userServise.getOne(id);
    }


}
