import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";


import {RefreshTokenSchema} from "./schemas/user-refreshToken.schema";
import {RefreshTokenService} from "./refreshToken.service";

@Module({
  imports:[
    MongooseModule.forFeature([{name: 'RefreshToken', schema: RefreshTokenSchema}]),
  ],
  providers: [RefreshTokenService],
  exports:[RefreshTokenService]
})
export class RefreshTokenModule {}
