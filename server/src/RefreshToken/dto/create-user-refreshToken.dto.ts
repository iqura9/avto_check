import { IsString, IsDateString } from 'class-validator';
import * as mongoose from 'mongoose';

export class CreateUserRefreshTokenDto {
    @IsString()
    refreshToken: string;
    @IsString()
    uId: mongoose.Types.ObjectId;
    @IsDateString()
    expireAt: string;
}