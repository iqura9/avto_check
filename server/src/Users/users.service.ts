import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import {InjectModel} from "@nestjs/mongoose";
import {Model, ObjectId} from "mongoose";
import * as _ from 'lodash';
import {CreateUserDto} from "./dto/create-user.dto";
import {IUser} from "./interface/user.interface";
import {CreateCartDto, CreateIDOFCARDto} from "../cars/dto/create-cart.dto";
import {ICart} from "../cars/interface/cart.interface";
require('dotenv').config();

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private userModal: Model<IUser>,
                @InjectModel('Cart') private CartModal : Model<ICart>) {}

    async create(dto: CreateUserDto, roles: Array<string>): Promise<IUser> {
        const {email, password} = dto;
        try {
            const existUser = await this.userModal.findOne({email});

            if (existUser) throw new HttpException(`User already exist`, 404);

            const hashedPassword = await bcrypt.hash(password, 7);

            const createdUser = new this.userModal(_.assignIn(dto, { password: hashedPassword, roles}));

            return await createdUser.save();

        } catch (e) {
            console.log(e);
            throw new HttpException(`Something went wrong`, 500);
        }
    }

    async find(id: string): Promise<IUser> {
        return await this.userModal.findById({id}).exec();
    }

    async findAll(): Promise<Array<IUser>>{
        return await this.userModal.find().exec();
    }

    async findByEmail(email: string): Promise<IUser> {
        return await this.userModal.findOne({ email:{$regex: new RegExp(email, 'i')} }).exec();
    }

    async addIdOfCar(dto: CreateCartDto){
        const user = await this.userModal.findById(dto.userId).exec();
        const folder = await this.CartModal.create({...dto});
        user.folders.push(folder._id);
        await user.save();
        return folder;
    }

    async getOne(id: string){
        const track = await this.userModal.findById(id).populate('folders');
        return track;
    }
}
