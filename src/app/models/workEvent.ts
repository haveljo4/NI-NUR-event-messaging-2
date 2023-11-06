import {DataElement} from "./DataElement";

export interface WorkEvent extends DataElement{
  name: string;
  status: string;
  description: string;
  participantGroupIds: number[];
  dateTime: string;
}
