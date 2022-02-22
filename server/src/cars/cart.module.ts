import { Module } from '@nestjs/common';

import { MongooseModule } from "@nestjs/mongoose";
import {CartController} from "./cart.controller";
import {CartService} from "./cart.service";
import {CartSchema} from "./schemes/cart.schema";
import {UserSchema} from "../Users/schemes/user.schema";
import {TokenModule} from "../token/token.module";
import {JwtStrategy} from "../auth/jwt.strategy";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {UsersModule} from "../Users/users.module";
require('dotenv').config();



@Module({
  imports: [
    TokenModule,
    MongooseModule.forFeature([{name: 'Cart', schema: CartSchema}]),
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {expiresIn: '1d'},
    }),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
