import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFiles,
  UseInterceptors
} from "@nestjs/common";

import { ObjectId } from "mongoose";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { doc } from "prettier";

import {CreateCartDto} from "./dto/create-cart.dto";
import {CartService} from "./cart.service";

@Controller('api/cars')
export class CartController {

  constructor(private cartService:CartService ) {}

  @Get()
  getAll(){
    return this.cartService.getAll();
  }
  @Post('')
  addCar(@Body() dto:CreateCartDto){
    return this.cartService.addCar(dto);
  }
  @Put(':id')
  updateOne(@Param('id') id: string, @Body() car:CreateCartDto){
    return this.cartService.updateOne(id, car);
  }
  @Delete('/:id')
  deleteGood(@Param('id') id: ObjectId){
    return this.cartService.deleteGood(id);
  }

  /*@Get('/search')
  search(@Query('query') query: string){
    return this.cartService.search(query);
  }
  se
  @Get('/:id')
  getOne(@Param('id') id: ObjectId){
    return this.cartService.getOne(id);
  }



  */





}
