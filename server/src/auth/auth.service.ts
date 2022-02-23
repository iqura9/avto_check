import {BadRequestException, Injectable, MethodNotAllowedException, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {TokenService} from 'src/token/token.service';
import * as moment from "moment";
import * as _ from 'lodash';
import * as bcrypt from 'bcryptjs';

import {SignOptions} from 'jsonwebtoken';
import {CreateUserTokenDto} from 'src/token/dto/create-user-token.dto';
import {UsersService} from "../Users/users.service";
import {CreateUserDto} from "../Users/dto/create-user.dto";
import {roleEnum} from "../Users/enums/role.enum";
import {IUser} from "../Users/interface/user.interface";
import {SignInDto} from "./dto/signin.dto";
import {ITokenPayload} from "./interfaces/token-payload.interface";
import {IUserToken} from "../token/interfaces/user-token.interface";
import {IReadableUser} from "../Users/interface/readable-user.interface";
import {userSensitiveFieldsEnum} from "../Users/enums/protected-fields.enum";
import {InjectModel} from "@nestjs/mongoose";
import mongoose, {Model} from "mongoose";
import {CreateUserRefreshTokenDto} from "../RefreshToken/dto/create-user-refreshToken.dto";
import {IUserRefreshToken} from "../RefreshToken/interfaces/user-refreshToken.interface";
import {RefreshTokenService} from "../RefreshToken/refreshToken.service";
require('dotenv').config();
@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UsersService,
        private readonly tokenService: TokenService,
        private readonly refreshTokenService: RefreshTokenService
    ) {
    }

    async signUp(createUserDto: CreateUserDto): Promise<any> {
        const user = await this.userService.create(createUserDto, [roleEnum.user]);
        return true;
    }

    async signIn({email, password}: SignInDto): Promise<IReadableUser> {
        const user = await this.userService.findByEmail(email);

        if (user && await bcrypt.compare(password, user.password)) {

            const tokenPayload: ITokenPayload = {
                _id: user._id,
                roles: user.roles
            };

            let temp = this.generateToken(tokenPayload, {expiresIn: '60s'});

            let token;
            await temp.then(res => {
                token = res;
            });
            let refreshToken = this.jwtService.sign(tokenPayload,{
                secret: process.env.REFRESH_SECRET,
                expiresIn: '7d'
            });
            const expireAt = moment()
                .add(60, 'seconds')
                .toISOString();


            await this.updateToken(user._id)//видаляю старі токіни такого юзера
            await this.saveToken({//створюю новий токін юзера
                token,
                expireAt,
                uId: user._id
            });
            await this.updateRefreshToken(user._id)//видаляю старі Refresh токіни такого юзера
            await this.saveRefreshToken({//створюю новий Refresh токін юзера
                refreshToken,
                expireAt,
                uId: user._id
            });
            const readableUser = user.toObject() as unknown as IReadableUser;
            readableUser.accessToken = await token;
            readableUser.refreshToken = refreshToken;
            return _.omit(readableUser, Object.values(userSensitiveFieldsEnum)) as IReadableUser;

        }
        throw new BadRequestException('Invalid credentials');
    }

    private async generateToken(data: ITokenPayload, options?: SignOptions): Promise<string> {
        return this.jwtService.sign(data,options);
    }

    private async verifyToken(token): Promise<any> {
        try {
            const data = this.jwtService.verify(token) as ITokenPayload;
            const tokenExists = await this.tokenService.exists(data._id, token);

            if (tokenExists) {
                return data;
            }
            throw new UnauthorizedException();
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    private async saveToken(createUserTokenDto: CreateUserTokenDto): Promise<IUserToken> {
        const userToken = await this.tokenService.create(createUserTokenDto);
        return userToken;
    }
    private async saveRefreshToken(CreateUserRefreshTokenDto: CreateUserRefreshTokenDto): Promise<IUserRefreshToken> {
        const userToken = await this.refreshTokenService.create(CreateUserRefreshTokenDto);
        return userToken;
    }

    private async updateToken(id: any) {
        const userToken = await this.tokenService.deleteAll(id);
        return userToken;
    }

    private async updateRefreshToken(id: any){
        const userToken = await this.refreshTokenService.deleteAll(id);
        return userToken;
    }
    async refresh(dto:any){
        let mongoose = require('mongoose');
        try{
            const userTokenData = await this.jwtService.verify(dto.token , {
                secret: process.env.REFRESH_SECRET
            } ) as ITokenPayload;
            let newId = mongoose.Types.ObjectId(userTokenData._id);
            const tokenPayload: ITokenPayload = {
                _id: userTokenData._id,
                roles: userTokenData.roles
            };
            let token = this.jwtService.sign(tokenPayload,{
                secret: process.env.SECRET,
                expiresIn: '60s',
            });
            const expireAt = moment()
                .add(60, 'seconds')
                .toISOString();
            await this.updateToken(userTokenData._id)//видаляю старі токіни такого юзера
            await this.saveToken({//створюю новий токін юзера
                token,
                expireAt,
                uId: newId
            });
            return {accessToken: token};
        }catch (e) {
            throw new UnauthorizedException();
        }

    }
}