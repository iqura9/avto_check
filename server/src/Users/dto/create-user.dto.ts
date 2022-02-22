import mongoose, {ObjectId} from "mongoose";
import {IAddress} from "../interface/address.interface";
import {IsEmail, IsEnum, IsNotEmpty} from "class-validator";
import {genderEnum} from "../enums/gender.enum";
import {cars} from "../../cars/dto/create-cart.dto";


export class CreateUserDto {
    @IsEmail()
    readonly email: string;
    readonly avatar: string;
    readonly avatarId: string;
    readonly lastName: string;
    @IsNotEmpty()
    readonly firstName: string;
    @IsEnum(genderEnum)
    readonly gender: string;

    readonly address: IAddress;
    readonly profession: string;
    readonly searchField: string;
    readonly phone: string;
    readonly roles: Array<string>;
    readonly password: string;
    readonly folders: Array<mongoose.Types.ObjectId>;
}