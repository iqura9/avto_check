import {Document, ObjectId} from "mongoose";
import mongoose from "mongoose";
import {infoType} from "../dto/create-cart.dto";



export interface ICart extends Document {
    readonly folderId: ObjectId;
    readonly mainImg: string;
    readonly nameOfFolder: String;
    readonly Cars: Array<infoType>
    readonly userId: ObjectId

}