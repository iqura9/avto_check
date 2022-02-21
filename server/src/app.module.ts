import { Module } from '@nestjs/common';

import * as path from 'path'
import { MongooseModule } from "@nestjs/mongoose";
import {CartModule} from "./cars/cart.module";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';



@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://iqura:l3Q8Fpf00ur7lRQi@cluster0.rvncj.mongodb.net/Car-server?retryWrites=true&w=majority'),
    CartModule,
    UsersModule,
    AuthModule,
    TokenModule
  ],
  controllers: [],
})
export class AppModule {}
