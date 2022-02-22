import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "./schemes/user.schema";
import {JwtStrategy} from "../auth/jwt.strategy";
import {AuthModule} from "../auth/auth.module";
import {CartSchema} from "../cars/schemes/cart.schema";


@Module({
  imports: [
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    MongooseModule.forFeature([{name: 'Cart', schema: CartSchema}])
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
