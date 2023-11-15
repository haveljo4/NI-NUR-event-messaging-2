import {Message} from "../message";

export interface MessageForm extends Omit<Message, 'id'> {
    id?: number;
}
