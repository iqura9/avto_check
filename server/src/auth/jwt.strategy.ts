import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";

import { TokenService } from "src/token/token.service";
import {IUser} from "../Users/interface/user.interface";
import {roleEnum} from "../Users/enums/role.enum";
import {ITokenPayload} from "./interfaces/token-payload.interface";

require('dotenv').config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly tokenService: TokenService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET,
            passReqToCallback: true,
        });
    }

    async validate(req, user: Partial<IUser>) {
        const token = req.headers.authorization.slice(7);
        const tokenExists = await this.tokenService.exists(user._id, token);
        if (tokenExists && user.roles.find(f => f===roleEnum.user || f===roleEnum.admin)) {
            return user;
        } else {
            throw new UnauthorizedException();
        }
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
}