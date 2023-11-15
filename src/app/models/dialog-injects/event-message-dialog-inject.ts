import {MessageForm} from "../forms/message-form";
import {Message} from "../message";

export interface EventMessageDialogInject {
    message?: MessageForm | Message
    state: "send" | "view";
}
