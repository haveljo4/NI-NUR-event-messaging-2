export interface Event {
  id: number;
  name: string;
  status: string;
  description: string;
  participantGroupIds: number[];
  dateTime: string;
}
