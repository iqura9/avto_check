import {Document, ObjectId} from 'mongoose';
import { IAddress } from './address.interface';
import {cars} from "../../cars/dto/create-cart.dto";

export interface IUser extends Document {
    readonly email: string;
    readonly avatar: string;
    readonly avatarId: string;
    readonly lastName: string;
    readonly firstName: string;
    readonly gender: string;
    readonly address: IAddress;
    readonly profession: string;
    readonly searchField: string;
    readonly phone: string;
    readonly roles: Array<string>;
    readonly password: string;
    readonly folders: Array<ObjectId>;
}