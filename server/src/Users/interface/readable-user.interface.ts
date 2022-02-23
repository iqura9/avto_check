import {IAddress} from "./address.interface";
import mongoose from "mongoose";

export interface IReadableUser {
    readonly email: string;
    readonly avatar: string;
    readonly avatarId: string;
    readonly lastName: string;
    readonly firstName: string;
    readonly gender: string;
    readonly address: IAddress;
    readonly profession: string;
    readonly phone: string;
    readonly roles: string[];
    readonly folders?: Array<mongoose.Types.ObjectId>;
    accessToken?: string;
    refreshToken?: string;
}