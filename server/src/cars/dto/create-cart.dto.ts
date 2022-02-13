import * as mongoose from "mongoose";

interface cars {
  folderId: mongoose.Types.ObjectId
  mainImg: string,
  nameOfFolder: string,
  Cars: Array<infoType>
}
export interface infoType {
  id: string,
  number: number
}

export class CreateCartDto {
  readonly folderId: mongoose.Types.ObjectId
  readonly mainImg: string
  readonly nameOfFolder: string
  readonly Cars: Array<infoType>
}
/*
"Cars": [
  {"id": "1", "number": 334443119},
  {"id": "2", "number": 334443120},
  {"id": "3", "number": 334443121}
]*/
