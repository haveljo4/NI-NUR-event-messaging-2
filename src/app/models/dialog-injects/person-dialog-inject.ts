import { PersonForm } from "../forms/person-form";
import { Group } from "../group";
import { FormType } from "../enums/form-type";

export interface PersonDialogInject {
  person?: PersonForm;
  groups: Group[];
  type: FormType;
}
