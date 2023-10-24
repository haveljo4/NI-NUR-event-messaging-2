import { GroupForm } from "../forms/group-form";
import { FormType } from "../enums/form-type";

export interface GroupDialogInject {
  group?: GroupForm;
  type: FormType;
}
