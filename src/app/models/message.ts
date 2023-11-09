import {DataElement} from "./DataElement";

export interface Message extends DataElement{
  type: "event" | "group";
  eventOrGroupIds: number[];
  subject: string;
  message: string;
  dateTime: Date;
  email: boolean;
  sms: boolean;
  whatsapp: boolean;
  slack: boolean;
}
