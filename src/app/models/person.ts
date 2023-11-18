import {DataElement} from "./DataElement";

export interface Person extends DataElement{
  groupIds: number[];
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
}
