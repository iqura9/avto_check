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
  UploadedFiles, UseGuards,
  UseInterceptors
} from "@nestjs/common";

import { ObjectId } from "mongoose";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { doc } from "prettier";

import {CreateCartDto} from "./dto/create-cart.dto";
import {CartService} from "./cart.service";
import {AdminRoleAuthGuard} from "./cart.guard";

@Controller('api/cars')
export class CartController {

  constructor(private cartService:CartService ) {}
  @UseGuards(AdminRoleAuthGuard)
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
  //Якщо папка належить юзеру з токіна, то удалити, інакше дамой
  @Delete('?')
  deleteGood(@Query('id') id: ObjectId ,@Query('userId') userId: ObjectId,){
    return this.cartService.deleteGood(id,userId);
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
