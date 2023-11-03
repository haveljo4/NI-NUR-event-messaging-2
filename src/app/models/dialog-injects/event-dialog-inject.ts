import { GroupForm } from "../forms/group-form";
import { FormType } from "../enums/form-type";
import {EventForm} from "../forms/event-form";

export interface EventDialogInject {
  event?: EventForm;
  type: FormType;
}
