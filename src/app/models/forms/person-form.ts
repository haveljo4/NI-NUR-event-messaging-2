export interface PersonForm {
  id?: number;
  // TODO implement support for multiple groups
  groupId?: number;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
}
