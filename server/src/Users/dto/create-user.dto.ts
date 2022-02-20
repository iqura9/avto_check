import mongoose from "mongoose";


export class CreateUserDto {
    readonly id: string
    readonly email: string
    readonly password: string
}