export interface Message {
  id: number;
  type: string; // event/group
  eventOrGroupId: number;
  subject: string;
  message: string;
  dateTime: string;
}
