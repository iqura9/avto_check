import { Document } from 'mongoose';

export interface IUserRefreshToken extends Document {
    readonly refreshToken: string;
    readonly uId: string;
    readonly expireAt: string;
}