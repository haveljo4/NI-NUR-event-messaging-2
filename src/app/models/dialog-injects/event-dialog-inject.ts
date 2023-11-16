import { FormType } from "../enums/form-type";
import {EventForm} from "../forms/event-form";
import {WorkEvent} from "../workEvent";

export interface EventDialogInject {
  event: WorkEvent;
  type: FormType;
}
