import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {IUserRefreshToken} from "./interfaces/user-refreshToken.interface";
import {CreateUserRefreshTokenDto} from "./dto/create-user-refreshToken.dto";


@Injectable()
export class RefreshTokenService {
    constructor(@InjectModel('RefreshToken') private readonly refreshModel: Model<IUserRefreshToken>) { }

    async create(CreateUserRefreshTokenDto: CreateUserRefreshTokenDto): Promise<IUserRefreshToken> {
        const userToken = new this.refreshModel(CreateUserRefreshTokenDto);
        return await userToken.save()
    }

    async delete(uId: string, token: string) : Promise<any> {
        const deleted = await this.refreshModel.deleteOne({ uId, token });
        return deleted;
    }

    async deleteAll(uId: string) : Promise<any> {
        const deletedAll = await this.refreshModel.deleteMany({ uId });
        return deletedAll;
    }

    async exists(uId: string, token: string): Promise<boolean> {
        return await this.refreshModel.exists({ uId, token });
    }
}