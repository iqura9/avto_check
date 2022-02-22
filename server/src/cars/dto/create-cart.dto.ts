import * as mongoose from "mongoose";
import {ObjectId} from "mongoose";

export interface cars {
  folderId: ObjectId
  mainImg: string,
  nameOfFolder: string,
  Cars: Array<infoType>
}
export interface infoType {
  id: string,
  number: number
}
export class CreateIDOFCARDto {
  readonly id: string
  readonly number: number
}

export class CreateCartDto {
  readonly folderId: mongoose.Types.ObjectId
  readonly mainImg: string
  readonly nameOfFolder: string
  readonly Cars: Array<infoType>
  readonly userId: mongoose.Types.ObjectId
}
/*
"Cars": [
  {"id": "1", "number": 334443119},
  {"id": "2", "number": 334443120},
  {"id": "3", "number": 334443121}
]*/
