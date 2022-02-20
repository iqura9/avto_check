import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../Users/schemes/user.schema";
import {Role, RoleSchema} from "./schemes/roles.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Role.name,
      schema: RoleSchema
    }])
  ],
  providers: [RolesService],
  controllers: [RolesController]
})
export class RolesModule {}