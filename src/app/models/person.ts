export interface Person {
  id: number;
  groupIds: number[];
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  groupNames?: [string];
}
