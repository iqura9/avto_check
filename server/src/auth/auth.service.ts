import {Injectable, MethodNotAllowedException, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';

import { SignOptions } from 'jsonwebtoken';
import { CreateUserTokenDto } from 'src/token/dto/create-user-token.dto';
import {UsersService} from "../Users/users.service";
import {CreateUserDto} from "../Users/dto/create-user.dto";
import {roleEnum} from "../Users/enums/role.enum";
import {IUser} from "../Users/interface/user.interface";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UsersService,
        private readonly tokenService: TokenService,
    ) { }

    async signUp(createUserDto: CreateUserDto): Promise<boolean> {
        const user = await this.userService.create(createUserDto, [roleEnum.user]);
        
        return true;
    }

    signIn(email, password) {

    }

    /*async signUser(user: IUser, withStatusCheck: boolean = true): Promise<string> {
        if (withStatusCheck && (user.status !== statusEnum.active)) {
            throw new MethodNotAllowedException();
        }
        const tokenPayload: ITokenPayload = {
            _id: user._id,
            status: user.status,
            roles: user.roles,
        };
        const token = await this.generateToken(tokenPayload);
        const expireAt = moment()
            .add(1, 'day')
            .toISOString();

        await this.saveToken({
            token,
            expireAt,
            uId: user._id,
        });

        return token;
    }*/


    private async generateToken(data, options?: SignOptions) : Promise<string>{
        return this.jwtService.sign(data, options);
    }

    private async verifyToken(token): Promise<any> {
        try {
            const data = this.jwtService.verify(token);
            const tokenExists = await this.tokenService.exists(data._id, token);

            if (tokenExists) {
                return data;
            }
            throw new UnauthorizedException();
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    private async saveToken(createUserTokenDto: CreateUserTokenDto) {
        const userToken = await this.tokenService.create(createUserTokenDto);
        return userToken;
    }
}