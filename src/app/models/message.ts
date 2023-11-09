import {DataElement} from "./DataElement";

export interface Message  extends DataElement{
  type: string; // event/group
  eventOrGroupId: number;
  subject: string;
  message: string;
  dateTime: string;
}
