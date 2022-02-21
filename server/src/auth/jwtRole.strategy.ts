import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";

import { TokenService } from "src/token/token.service";
import {IUser} from "../Users/interface/user.interface";
import {roleEnum} from "../Users/enums/role.enum";

require('dotenv').config();

@Injectable()
export class JwtRoleStrategy extends PassportStrategy(Strategy, 'jwtRole') {
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
        if (tokenExists && user.roles.find(f => f===roleEnum.admin)) {
            console.log("open");
            return user;
        } else {
            return {message: "Ne admin"}
        }
    }
}