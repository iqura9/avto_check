import mongoose from "mongoose";
import {IAddress} from "../interface/address.interface";
import {IsEmail, IsEnum, IsNotEmpty} from "class-validator";
import {genderEnum} from "../enums/gender.enum";


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
}