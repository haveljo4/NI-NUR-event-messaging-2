import {MessageForm} from "../forms/message-form";
import {Message} from "../message";

export interface GroupMessageDialogInject {
  message?: MessageForm | Message
  state: "send" | "view";
}
