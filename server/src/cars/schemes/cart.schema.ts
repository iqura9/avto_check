import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'
import {infoType} from "../dto/create-cart.dto";
export type CartDocument = Cart & Document;

@Schema()
export class Cart {
  @Prop( {types:mongoose.Types.ObjectId})
  folderId: mongoose.Types.ObjectId;

  @Prop()
  mainImg: string;

  @Prop()
  nameOfFolder: string;

  @Prop()
  Cars: Array<infoType>


}

export const CartSchema = SchemaFactory.createForClass(Cart);
