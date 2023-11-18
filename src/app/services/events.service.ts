import { Injectable } from "@angular/core";
import {AbstractDataService} from "./abstract-data.service";
import {WorkEvent} from "../models/workEvent";
import {EVENTS} from "../mocks/EventsData";
import {EventForm} from "../models/forms/event-form";

@Injectable({
  providedIn: "root"
})
export class EventsService extends AbstractDataService<WorkEvent>{
  constructor() {
    super(EVENTS);
  }
  override add(event: WorkEvent): number {
    // event.id = ++super._maxId;
    this._elems.push(
      {id: ++this._maxId, dateTime: event.dateTime, description: event.description, name: event.name, participantGroupIds: event.participantGroupIds, status: event.status}
    );
    return this._maxId;
  }

  convertElementToString(elem: WorkEvent): string {
    return elem.name;
  }
}
