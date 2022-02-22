import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";

import { Model, ObjectId } from "mongoose";
import {CreateCartDto} from "./dto/create-cart.dto";
import {ICart} from "./interface/cart.interface";
import {IUser} from "../Users/interface/user.interface";


@Injectable()
export class CartService {

  constructor(@InjectModel('Cart') private CartModal : Model<ICart>,
              @InjectModel('User') private userModal: Model<IUser>) {}

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
  async deleteGood(id: ObjectId , userId: ObjectId){
    const goood = await this.CartModal.findByIdAndDelete(id);
    const updatedUser = await this.userModal.updateOne({"_id": userId},
        {$pull : {folders:{$in: [id]}}});
    console.log(updatedUser);
    return true;
  }
}
