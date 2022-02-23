import {Injectable, CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common';
import { Observable } from 'rxjs';
import {TokenService} from "../token/token.service";
import {ITokenPayload} from "./interfaces/token-payload.interface";
import {JwtService} from "@nestjs/jwt";
import {roleEnum} from "../Users/enums/role.enum";
import {Schema} from "mongoose";

@Injectable()
export class AdminAuthGuard implements CanActivate {
    constructor(private readonly tokenService: TokenService,
                private readonly jwtService: JwtService){}
    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        const token = req.headers.authorization.slice(7);
        const temp = this.verifyToken(token);

        let data;
        if(temp){
            await temp.then( res => data = res);
            console.log(data);
        }
        if (temp && data.roles.find(f =>  f===roleEnum.admin)) return true;
        return false;
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
 /*   private isTokenExpired(data:any){
        if(data.exp === undefined) return null;
        const date = new Date(0);
        const dateRightNow = new Date();
        date.setUTCSeconds(data.exp+10);//token date
        console.log(date.valueOf());
        console.log(date);
        console.log(dateRightNow.valueOf());
        console.log(dateRightNow);

        return (date.valueOf() < dateRightNow.valueOf());


    }*/
}