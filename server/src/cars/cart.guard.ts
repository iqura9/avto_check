import {Injectable, CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common';
import {TokenService} from "../token/token.service";

import {JwtService} from "@nestjs/jwt";
import {roleEnum} from "../Users/enums/role.enum";
import {ITokenPayload} from "../auth/interfaces/token-payload.interface";

@Injectable()
export class AdminRoleAuthGuard implements CanActivate {
    constructor(private readonly tokenService: TokenService,
                private readonly jwtService: JwtService){}
    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        const token = req.headers.authorization.slice(7);
        const temp = this.verifyToken(token);
        let data;
        if(temp){
            await temp.then( res => data = res);
        }
        if (temp && data.roles.find(f => f===roleEnum.admin)) return true;
        return false;
    }
    private async verifyToken(token): Promise<any> {

        try {
            const data = this.jwtService.verify(token) as ITokenPayload;
            const tokenExists = await this.tokenService.exists(data._id, token);
            if (tokenExists) return data;
            throw new UnauthorizedException();
        } catch (error) {
            console.log(error);
            throw new UnauthorizedException();
        }
    }
}