import { Injectable } from "@angular/core";
import {AbstractDataService} from "./abstract-data.service";
import {MESSAGES} from "../mocks/Messages";
import {Message} from "../models/message";

@Injectable({
  providedIn: "root"
})
export class MessagesService extends AbstractDataService<Message, Message>{
  constructor() {
    super(MESSAGES);
  }

  override add (message: Message): void {
    super._elems.push(message);
  }
}
