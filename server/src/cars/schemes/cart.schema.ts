import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import * as mongoose from 'mongoose'
import {infoType} from "../dto/create-cart.dto";

export const CartSchema = new mongoose.Schema({
    folderId: {type: mongoose.Schema.Types.ObjectId},
    mainImg: {type: String},
    nameOfFolder: {type: String},
    Cars: [
        {
            id: {type: String},
            number: {type: Number},
        }
    ],
});