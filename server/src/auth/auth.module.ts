import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UsersModule} from "../Users/users.module";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./jwt.strategy";
import {TokenModule} from "../token/token.module";
import {JwtRoleStrategy} from "./jwtRole.strategy";
require('dotenv').config();

@Module({
  imports:[
      UsersModule,
      TokenModule,
      PassportModule.register({defaultStrategy:'jwt'}),
      JwtModule.register({
          secret: process.env.SECRET,
          signOptions: {expiresIn: '1d'},
      }),
  ],
  providers: [AuthService, JwtStrategy,JwtRoleStrategy],
  controllers: [AuthController],
    exports: [JwtStrategy,JwtRoleStrategy]
})
export class AuthModule {}
