import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User, UserDocument} from "./schemes/user.schema";
import {CreateUserDto} from "./dto/create-user.dto";
require('dotenv').config();
@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private UserModal : Model<UserDocument>) {}

    async signUp(dto:CreateUserDto){
        const {email, password} = dto;
        try{
            const existUser = await this.UserModal.findOne({email});

            if(existUser) return new HttpException(`User already exist`, 404);

           const hashedPassword = await bcrypt.hash(password,7);

           const result = await this.UserModal.create({email,password:hashedPassword,});

            const token = jwt.sign({ email: result.email, id:result._id},process.env.SECRET, {expiresIn: '1h'});

            return ({result,token});
        }catch (e) {
            console.log(e);
            return new HttpException(`Something went wrong`, 500);
        }
    }
    async signIn(dto:CreateUserDto){
        const {email, password} = dto;

        try{
            const existUser = await this.UserModal.findOne({email});

            if(!existUser) return new HttpException(`User doesn't exist`, 404);

            const isPasswordCorrect = bcrypt.compareSync(password, existUser.password);
            if(!isPasswordCorrect) return new HttpException(`Invalid password`, 400);

            const token = jwt.sign({ email: existUser.email, id:existUser._id},process.env.SECRET, {expiresIn: '1h'});

            return {result: existUser, token};
        }catch (e) {
            return new HttpException(`Something went wrong`, 500);
        }
    }
    async getAll(){
        const user = await this.UserModal.find();
        return user;
    }
}
