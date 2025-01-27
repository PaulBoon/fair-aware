import { Language } from "../language.interface";
import { IDigitalObjectType } from "./digital-object-type.interface";

export interface IDigitalObjectTypeSchema {
  uuid: string;
  schema: object;
  version: string;

  digitalObjectType: IDigitalObjectType;
  language: Language;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
