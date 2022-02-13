import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";

import { Model, ObjectId } from "mongoose";
import {Cart, CartDocument} from "./schemes/cart.schema";
import {CreateCartDto} from "./dto/create-cart.dto";


@Injectable()
export class CartService {

  constructor(@InjectModel(Cart.name) private CartModal : Model<CartDocument>) {}

  async getAll(){
    const car = await this.CartModal.find();
    return car;
  }
  async addCar(dto:CreateCartDto){
    const car = await this.CartModal.create({...dto});
    await car.save();
    return car;
  }
  async updateOne(id:string, dto:CreateCartDto){
    const car = await this.CartModal.findOneAndUpdate({_id:id},{...dto});
    await car.save();
    return 'resultcode:'+ 0;
  }
  /*async getOne(id:ObjectId) {
    const good = await this.GooodsModal.findById(id);
    return good;
  }
*/
  async deleteGood(id: ObjectId): Promise<ObjectId>{
    const goood = await this.CartModal.findByIdAndDelete(id);
    return goood.id;
  }




}
