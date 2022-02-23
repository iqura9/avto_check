import { Module } from '@nestjs/common';

import * as path from 'path'
import { MongooseModule } from "@nestjs/mongoose";
import {CartModule} from "./cars/cart.module";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';

require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://${process.env.MONGO_NAME}:${process.env.MONGO_PASSWORD}@cluster0.rvncj.mongodb.net/Car-server?retryWrites=true&w=majority`),
    CartModule,
    UsersModule,
    AuthModule,
    TokenModule
  ],
  controllers: [],
})
export class AppModule {}
