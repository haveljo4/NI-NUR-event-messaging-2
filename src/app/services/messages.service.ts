import { Injectable } from "@angular/core";
import {AbstractDataService} from "./abstract-data.service";
import {MESSAGES} from "../mocks/Messages";
import {Message} from "../models/message";
import {MessageForm} from "../models/forms/message-form";

@Injectable({
  providedIn: "root"
})
export class MessagesService extends AbstractDataService<Message>{
  constructor() {
    super(MESSAGES);
  }

  override add(message: Message | MessageForm): number {
    if (message.id) {
      this._elems.push(message as Message);
    }
    else {
      this._elems.push({
        ...message as MessageForm,
        id: ++this._maxId
      } as Message);
    }
    return this._maxId;
  }

  convertElementToString(elem: Message): string {
    return elem.subject;
  }
}
