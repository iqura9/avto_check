import {BadRequestException, Injectable, MethodNotAllowedException, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';
import * as moment from "moment";
import * as _ from 'lodash';
import * as bcrypt from 'bcryptjs';

import { SignOptions } from 'jsonwebtoken';
import { CreateUserTokenDto } from 'src/token/dto/create-user-token.dto';
import {UsersService} from "../Users/users.service";
import {CreateUserDto} from "../Users/dto/create-user.dto";
import {roleEnum} from "../Users/enums/role.enum";
import {IUser} from "../Users/interface/user.interface";
import {SignInDto} from "./dto/signin.dto";
import {ITokenPayload} from "./interfaces/token-payload.interface";
import {IUserToken} from "../token/interfaces/user-token.interface";
import {IReadableUser} from "../Users/interface/readable-user.interface";
import {userSensitiveFieldsEnum} from "../Users/enums/protected-fields.enum";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UsersService,
        private readonly tokenService: TokenService,
    ) { }

    async signUp(createUserDto: CreateUserDto): Promise<any> {
        const user = await this.userService.create(createUserDto, [roleEnum.user]);
        //return user;
        return true;
    }

    async signIn({email, password}:SignInDto) : Promise<IReadableUser> {
        const user = await this.userService.findByEmail(email);

        if(user && await bcrypt.compare(password, user.password)){

            const tokenPayload: ITokenPayload = {
                _id: user._id,
                roles: user.roles
            };

            let temp = this.generateToken(tokenPayload);
            let token;
            await temp.then(res => {
                token = res;
            });
            const expireAt = moment()
                .add(1, 'day')
                .toISOString();
            await this.saveToken({
                token,
                expireAt,
                uId: user._id
            });

            const readableUser = user.toObject() as IReadableUser;
            readableUser.accessToken = await token;

            return _.omit(readableUser, Object.values(userSensitiveFieldsEnum)) as IReadableUser;

        }
        throw new BadRequestException('Invalid credentials');
    }

    private async generateToken(data: ITokenPayload, options?: SignOptions) : Promise<string>{
        return this.jwtService.sign(data, options);
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

    private async saveToken(createUserTokenDto: CreateUserTokenDto):Promise<IUserToken> {
        const userToken = await this.tokenService.create(createUserTokenDto);
        return userToken;
    }
}